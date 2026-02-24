'use server'

import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/control-panel/auth'
import { getServiceClient } from '@/lib/control-panel/db'
import { generateComplianceForUser } from '@/lib/control-panel/generate-compliance'

const VALID_STATES = ['FL', 'WY', 'DE', 'NM', 'TX']

export async function submitOnboarding(formData: FormData) {
  const user = await requireAuth()
  const supabase = getServiceClient()

  // Extract form values
  const company_name = (formData.get('company_name') as string)?.trim()
  const state_of_formation = (formData.get('state_of_formation') as string)?.toUpperCase()
  const formation_date = formData.get('formation_date') as string
  const ein_status = formData.get('ein_status') as string
  const tax_classification = (formData.get('tax_classification') as string) || 'disregarded_entity'
  const fiscal_year_end_month = parseInt(formData.get('fiscal_year_end_month') as string, 10) || 12
  const has_us_bank_account = formData.get('has_us_bank_account') === 'on'

  // Validate required fields
  if (!company_name || !state_of_formation || !formation_date) {
    throw new Error('Missing required fields')
  }
  if (!VALID_STATES.includes(state_of_formation)) {
    throw new Error('Invalid state. Supported: FL, WY, DE, NM, TX')
  }
  if (fiscal_year_end_month < 1 || fiscal_year_end_month > 12) {
    throw new Error('Fiscal year end month must be between 1 and 12')
  }

  // Upsert LLC profile (idempotent on user_id unique constraint)
  console.log('[onboarding] Saving LLC profile for user:', user.id)

  const { error: insertError } = await supabase
    .from('cp_llc_profiles')
    .upsert(
      {
        user_id: user.id,
        company_name,
        state_of_formation,
        formation_date,
        ein_status,
        tax_classification,
        foreign_owner: true,
        fiscal_year_end_month,
        has_us_bank_account,
      },
      { onConflict: 'user_id' }
    )

  if (insertError) {
    console.log('[onboarding] Insert error:', insertError.message)
    throw new Error('Failed to save LLC profile')
  }

  console.log('[onboarding] Profile saved, generating compliance items')

  // Generate compliance items from rules engine
  const count = await generateComplianceForUser(user.id)
  console.log('[onboarding] Generated', count, 'compliance items')

  redirect('/control-panel/app/checklist')
}
