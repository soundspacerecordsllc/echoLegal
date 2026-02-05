// app/api/contributor-application/route.ts
// API route for contributor application submissions.
//
// Phase 1: Validates and logs applications. Sends notification email placeholder.
// Phase 2 (future): Persists to Supabase, triggers automated review pipeline.

import { NextRequest, NextResponse } from 'next/server'
import {
  validateApplication,
  createApplication,
  type ContributorApplication,
} from '@/lib/contributor-applications'

/**
 * POST /api/contributor-application
 *
 * Accepts a contributor application submission.
 * Validates all required fields and returns appropriate errors.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the application
    const errors = validateApplication(body)
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors: errors.map(e => ({
            field: e.field,
            message: e.message.en, // API responses in English
          })),
        },
        { status: 400 }
      )
    }

    // Create the application record
    const application: ContributorApplication = createApplication({
      fullName: body.fullName,
      email: body.email,
      preferredDisplayTitle: body.preferredDisplayTitle,
      barAdmissions: body.barAdmissions,
      yearsOfPractice: body.yearsOfPractice,
      currentPosition: body.currentPosition,
      institution: body.institution,
      practiceAreas: body.practiceAreas,
      jurisdictions: body.jurisdictions || [],
      languages: body.languages,
      contributionInterests: body.contributionInterests,
      proposedTopics: body.proposedTopics,
      statementOfInterest: body.statementOfInterest,
      writingSampleUrl: body.writingSampleUrl,
      linkedInUrl: body.linkedInUrl,
      referralSource: body.referralSource,
    })

    // Phase 1: Log the application (console + structured output for monitoring)
    console.log('[contributor-application] New application received:', {
      id: application.id,
      email: application.email,
      jurisdictions: application.barAdmissions.map(ba => ba.jurisdiction),
      practiceAreas: application.practiceAreas,
      contributionInterests: application.contributionInterests,
      submittedAt: application.submittedAt,
    })

    // Phase 2 TODO: Persist to Supabase
    // const { data, error } = await supabase
    //   .from('contributor_applications')
    //   .insert(application)

    // Phase 2 TODO: Send confirmation email to applicant
    // await sendEmail({
    //   to: application.email,
    //   template: 'contributor-application-received',
    //   data: { name: application.fullName, id: application.id },
    // })

    // Phase 2 TODO: Notify editorial authority
    // await sendEmail({
    //   to: process.env.EDITORIAL_EMAIL,
    //   template: 'new-contributor-application',
    //   data: application,
    // })

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        message: 'Application submitted successfully.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[contributor-application] Error processing application:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    )
  }
}
