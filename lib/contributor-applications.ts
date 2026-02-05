// lib/contributor-applications.ts
// Contributor application data model and workflow for EchoLegal
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 2.2 and Section 2.5:
// Application form, submission handling, candidate → author promotion workflow.
//
// Phase 1 (current): Static data model + form validation.
// Phase 2 (future): Supabase persistence + admin review interface.

import { JurisdictionCode, LanguageCode } from './jurisdictions'
import { ContributorTier } from './contributors'

// ============================================
// APPLICATION TYPES
// ============================================

/**
 * Status of a contributor application through the review pipeline.
 */
export type ApplicationStatus =
  | 'submitted'           // Application received, awaiting review
  | 'under-review'        // Application being evaluated
  | 'verification-pending' // Credentials being verified
  | 'approved'            // Application approved, contributor onboarded
  | 'rejected'            // Application rejected (with reason)
  | 'withdrawn'           // Applicant withdrew their application

/**
 * Types of contributions an applicant is interested in making.
 */
export type ContributionInterest =
  | 'encyclopedia-articles'   // Encyclopedic reference articles
  | 'contract-templates'      // Legal document templates
  | 'checklists-guides'       // Procedural checklists and guides
  | 'peer-review'             // Reviewing existing content
  | 'translation'             // Translating content to other languages
  | 'legal-updates'           // Tracking and reporting legal changes

/**
 * Practice area specializations for matching contributors to content needs.
 */
export type PracticeArea =
  | 'business-formation'
  | 'corporate'
  | 'contracts'
  | 'immigration'
  | 'tax'
  | 'employment'
  | 'intellectual-property'
  | 'real-estate'
  | 'privacy-data'
  | 'compliance'
  | 'international-trade'
  | 'family-law'
  | 'criminal-law'
  | 'litigation'
  | 'other'

// ============================================
// APPLICATION DATA MODEL
// ============================================

/**
 * ContributorApplication — captures all information needed to evaluate
 * a prospective contributor.
 *
 * Per Section 5.3.1 of the execution plan, the application includes:
 * - Bar admission jurisdiction and number
 * - Years of practice
 * - Specialization areas
 * - Languages of fluency
 * - Preferred contribution type
 * - Brief statement of interest
 */
export type ContributorApplication = {
  // Identity
  id: string                          // Generated application ID (e.g., 'app-20260205-abc123')
  submittedAt: string                 // ISO date of submission

  // Personal information (private)
  fullName: string                    // Legal name
  email: string                       // Contact email
  preferredDisplayTitle?: string      // How they want to be identified publicly

  // Professional credentials
  barAdmissions: ApplicationBarAdmission[]
  yearsOfPractice: number
  currentPosition?: string            // Current role/firm (optional)
  institution?: string                // Current firm or academic institution

  // Expertise
  practiceAreas: PracticeArea[]
  jurisdictions: JurisdictionCode[]   // Jurisdictions they can cover
  languages: LanguageCode[]           // Languages they can write in

  // Contribution preferences
  contributionInterests: ContributionInterest[]
  proposedTopics?: string             // Brief description of topics they'd like to cover
  statementOfInterest: string         // Why they want to contribute (2-5 sentences)

  // Portfolio (optional)
  writingSampleUrl?: string           // Link to published legal writing
  linkedInUrl?: string                // Professional profile

  // Application state
  status: ApplicationStatus
  reviewedAt?: string                 // ISO date of review
  reviewedBy?: string                 // Contributor ID of reviewer
  reviewNotes?: string                // Internal notes from reviewer
  rejectionReason?: string            // Reason if rejected (shared with applicant)
  assignedTier?: ContributorTier      // Tier assigned upon approval

  // Metadata
  applicationVersion: number          // Form version (for tracking schema changes)
  ipAddress?: string                  // For anti-spam (stored but not displayed)
  referralSource?: string             // How they heard about EchoLegal
}

/**
 * Bar admission details as provided in the application.
 * These are unverified at submission time.
 */
export type ApplicationBarAdmission = {
  jurisdiction: string                // Free-text jurisdiction (normalized during review)
  jurisdictionCode?: JurisdictionCode // Normalized code (set during review)
  barNumber: string                   // Bar registration number
  admissionYear: number               // Year of admission
  status: 'active' | 'inactive' | 'retired'
}

// ============================================
// FORM VALIDATION
// ============================================

export type ValidationError = {
  field: string
  message: { en: string; tr: string }
}

/**
 * Validate a contributor application form submission.
 * Returns an array of validation errors (empty = valid).
 */
export function validateApplication(
  data: Partial<ContributorApplication>
): ValidationError[] {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push({
      field: 'fullName',
      message: {
        en: 'Full name is required.',
        tr: 'Ad soyad gereklidir.',
      },
    })
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: {
        en: 'A valid email address is required.',
        tr: 'Geçerli bir e-posta adresi gereklidir.',
      },
    })
  }

  // Bar admissions
  if (!data.barAdmissions || data.barAdmissions.length === 0) {
    errors.push({
      field: 'barAdmissions',
      message: {
        en: 'At least one bar admission is required.',
        tr: 'En az bir baro kaydı gereklidir.',
      },
    })
  } else {
    data.barAdmissions.forEach((admission, index) => {
      if (!admission.jurisdiction || admission.jurisdiction.trim().length === 0) {
        errors.push({
          field: `barAdmissions[${index}].jurisdiction`,
          message: {
            en: `Bar admission ${index + 1}: jurisdiction is required.`,
            tr: `Baro kaydı ${index + 1}: yargı alanı gereklidir.`,
          },
        })
      }
      if (!admission.barNumber || admission.barNumber.trim().length === 0) {
        errors.push({
          field: `barAdmissions[${index}].barNumber`,
          message: {
            en: `Bar admission ${index + 1}: bar number is required.`,
            tr: `Baro kaydı ${index + 1}: baro numarası gereklidir.`,
          },
        })
      }
      if (
        !admission.admissionYear ||
        admission.admissionYear < 1950 ||
        admission.admissionYear > new Date().getFullYear()
      ) {
        errors.push({
          field: `barAdmissions[${index}].admissionYear`,
          message: {
            en: `Bar admission ${index + 1}: valid admission year is required.`,
            tr: `Baro kaydı ${index + 1}: geçerli bir kabul yılı gereklidir.`,
          },
        })
      }
    })
  }

  // Years of practice
  if (data.yearsOfPractice == null || data.yearsOfPractice < 0 || data.yearsOfPractice > 70) {
    errors.push({
      field: 'yearsOfPractice',
      message: {
        en: 'Years of practice is required (0-70).',
        tr: 'Mesleki deneyim yılı gereklidir (0-70).',
      },
    })
  }

  // Practice areas
  if (!data.practiceAreas || data.practiceAreas.length === 0) {
    errors.push({
      field: 'practiceAreas',
      message: {
        en: 'Select at least one practice area.',
        tr: 'En az bir uzmanlık alanı seçin.',
      },
    })
  }

  // Languages
  if (!data.languages || data.languages.length === 0) {
    errors.push({
      field: 'languages',
      message: {
        en: 'Select at least one language.',
        tr: 'En az bir dil seçin.',
      },
    })
  }

  // Contribution interests
  if (!data.contributionInterests || data.contributionInterests.length === 0) {
    errors.push({
      field: 'contributionInterests',
      message: {
        en: 'Select at least one type of contribution.',
        tr: 'En az bir katkı türü seçin.',
      },
    })
  }

  // Statement of interest
  if (!data.statementOfInterest || data.statementOfInterest.trim().length < 50) {
    errors.push({
      field: 'statementOfInterest',
      message: {
        en: 'Statement of interest must be at least 50 characters.',
        tr: 'İlgi beyanı en az 50 karakter olmalıdır.',
      },
    })
  }

  if (data.statementOfInterest && data.statementOfInterest.trim().length > 2000) {
    errors.push({
      field: 'statementOfInterest',
      message: {
        en: 'Statement of interest must be under 2000 characters.',
        tr: 'İlgi beyanı 2000 karakterden az olmalıdır.',
      },
    })
  }

  return errors
}

// ============================================
// APPLICATION HELPERS
// ============================================

/**
 * Generate a unique application ID.
 */
export function generateApplicationId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).substring(2, 8)
  return `app-${date}-${random}`
}

/**
 * Create a new application from form data.
 */
export function createApplication(
  formData: Omit<ContributorApplication, 'id' | 'submittedAt' | 'status' | 'applicationVersion'>
): ContributorApplication {
  return {
    ...formData,
    id: generateApplicationId(),
    submittedAt: new Date().toISOString(),
    status: 'submitted',
    applicationVersion: 1,
  }
}

/**
 * Check if an application can transition to a given status.
 */
export function canTransitionTo(
  currentStatus: ApplicationStatus,
  targetStatus: ApplicationStatus
): boolean {
  const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
    submitted: ['under-review', 'withdrawn'],
    'under-review': ['verification-pending', 'rejected', 'withdrawn'],
    'verification-pending': ['approved', 'rejected', 'under-review'],
    approved: [],                  // Terminal state
    rejected: ['under-review'],    // Can be reconsidered
    withdrawn: ['submitted'],      // Can reapply
  }

  return allowedTransitions[currentStatus]?.includes(targetStatus) ?? false
}

/**
 * Transition an application to a new status.
 */
export function transitionApplication(
  application: ContributorApplication,
  targetStatus: ApplicationStatus,
  reviewerId?: string,
  notes?: string
): ContributorApplication {
  if (!canTransitionTo(application.status, targetStatus)) {
    throw new Error(
      `Cannot transition application from '${application.status}' to '${targetStatus}'`
    )
  }

  return {
    ...application,
    status: targetStatus,
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewerId,
    reviewNotes: notes || application.reviewNotes,
  }
}

// ============================================
// APPLICATION STATUS LABELS
// ============================================

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, { en: string; tr: string }> = {
  submitted: { en: 'Submitted', tr: 'Gönderildi' },
  'under-review': { en: 'Under Review', tr: 'İnceleniyor' },
  'verification-pending': { en: 'Verification Pending', tr: 'Doğrulama Bekliyor' },
  approved: { en: 'Approved', tr: 'Onaylandı' },
  rejected: { en: 'Not Accepted', tr: 'Kabul Edilmedi' },
  withdrawn: { en: 'Withdrawn', tr: 'Geri Çekildi' },
}

// ============================================
// PRACTICE AREA LABELS
// ============================================

export const PRACTICE_AREA_LABELS: Record<PracticeArea, { en: string; tr: string }> = {
  'business-formation': { en: 'Business Formation', tr: 'Şirket Kuruluşu' },
  corporate: { en: 'Corporate Law', tr: 'Şirketler Hukuku' },
  contracts: { en: 'Contracts', tr: 'Sözleşmeler' },
  immigration: { en: 'Immigration', tr: 'Göçmenlik' },
  tax: { en: 'Tax', tr: 'Vergi' },
  employment: { en: 'Employment', tr: 'İş Hukuku' },
  'intellectual-property': { en: 'Intellectual Property', tr: 'Fikri Mülkiyet' },
  'real-estate': { en: 'Real Estate', tr: 'Gayrimenkul' },
  'privacy-data': { en: 'Privacy & Data', tr: 'Gizlilik ve Veri' },
  compliance: { en: 'Compliance', tr: 'Uyum' },
  'international-trade': { en: 'International Trade', tr: 'Uluslararası Ticaret' },
  'family-law': { en: 'Family Law', tr: 'Aile Hukuku' },
  'criminal-law': { en: 'Criminal Law', tr: 'Ceza Hukuku' },
  litigation: { en: 'Litigation', tr: 'Dava' },
  other: { en: 'Other', tr: 'Diğer' },
}

// ============================================
// CONTRIBUTION INTEREST LABELS
// ============================================

export const CONTRIBUTION_INTEREST_LABELS: Record<ContributionInterest, { en: string; tr: string }> = {
  'encyclopedia-articles': { en: 'Encyclopedia Articles', tr: 'Ansiklopedi Makaleleri' },
  'contract-templates': { en: 'Contract Templates', tr: 'Sözleşme Şablonları' },
  'checklists-guides': { en: 'Checklists & Guides', tr: 'Kontrol Listeleri ve Rehberler' },
  'peer-review': { en: 'Peer Review', tr: 'Hakem Değerlendirmesi' },
  translation: { en: 'Translation', tr: 'Çeviri' },
  'legal-updates': { en: 'Legal Updates', tr: 'Hukuki Güncellemeler' },
}

// ============================================
// LANGUAGE OPTIONS (for the form)
// ============================================

export const LANGUAGE_OPTIONS: { code: LanguageCode; label: { en: string; tr: string } }[] = [
  { code: 'en', label: { en: 'English', tr: 'İngilizce' } },
  { code: 'tr', label: { en: 'Turkish', tr: 'Türkçe' } },
  { code: 'de', label: { en: 'German', tr: 'Almanca' } },
  { code: 'fr', label: { en: 'French', tr: 'Fransızca' } },
  { code: 'es', label: { en: 'Spanish', tr: 'İspanyolca' } },
  { code: 'pt', label: { en: 'Portuguese', tr: 'Portekizce' } },
  { code: 'zh', label: { en: 'Chinese', tr: 'Çince' } },
  { code: 'ja', label: { en: 'Japanese', tr: 'Japonca' } },
  { code: 'ar', label: { en: 'Arabic', tr: 'Arapça' } },
]

// ============================================
// INTERNAL HELPERS
// ============================================

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
