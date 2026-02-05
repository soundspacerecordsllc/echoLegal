// components/ContributorApplicationForm.tsx
// Interactive contributor application form.
// Client component with form state management and validation.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 2.2 and Section 5.3.1.

'use client'

import { useState } from 'react'
import {
  type ApplicationBarAdmission,
  type ContributionInterest,
  type PracticeArea,
  type ValidationError,
  PRACTICE_AREA_LABELS,
  CONTRIBUTION_INTEREST_LABELS,
  LANGUAGE_OPTIONS,
  validateApplication,
} from '@/lib/contributor-applications'
import type { LanguageCode, JurisdictionCode } from '@/lib/jurisdictions'

// ============================================
// TYPES
// ============================================

type FormState = {
  fullName: string
  email: string
  preferredDisplayTitle: string
  barAdmissions: ApplicationBarAdmission[]
  yearsOfPractice: string
  currentPosition: string
  institution: string
  practiceAreas: PracticeArea[]
  languages: LanguageCode[]
  contributionInterests: ContributionInterest[]
  proposedTopics: string
  statementOfInterest: string
  writingSampleUrl: string
  linkedInUrl: string
  referralSource: string
}

type ContributorApplicationFormProps = {
  lang: 'en' | 'tr'
}

// ============================================
// INITIAL STATE
// ============================================

const EMPTY_BAR_ADMISSION: ApplicationBarAdmission = {
  jurisdiction: '',
  barNumber: '',
  admissionYear: new Date().getFullYear(),
  status: 'active',
}

function getInitialState(): FormState {
  return {
    fullName: '',
    email: '',
    preferredDisplayTitle: '',
    barAdmissions: [{ ...EMPTY_BAR_ADMISSION }],
    yearsOfPractice: '',
    currentPosition: '',
    institution: '',
    practiceAreas: [],
    languages: [],
    contributionInterests: [],
    proposedTopics: '',
    statementOfInterest: '',
    writingSampleUrl: '',
    linkedInUrl: '',
    referralSource: '',
  }
}

// ============================================
// COMPONENT
// ============================================

export default function ContributorApplicationForm({ lang }: ContributorApplicationFormProps) {
  const isEnglish = lang === 'en'
  const [form, setForm] = useState<FormState>(getInitialState)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // ---- Field helpers ----

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear errors for this field
    setErrors(prev => prev.filter(e => !e.field.startsWith(field)))
  }

  function getFieldError(field: string): string | undefined {
    const err = errors.find(e => e.field === field)
    return err ? err.message[lang] : undefined
  }

  // ---- Bar admissions ----

  function addBarAdmission() {
    setForm(prev => ({
      ...prev,
      barAdmissions: [...prev.barAdmissions, { ...EMPTY_BAR_ADMISSION }],
    }))
  }

  function removeBarAdmission(index: number) {
    if (form.barAdmissions.length <= 1) return
    setForm(prev => ({
      ...prev,
      barAdmissions: prev.barAdmissions.filter((_, i) => i !== index),
    }))
  }

  function updateBarAdmission(index: number, field: keyof ApplicationBarAdmission, value: string | number) {
    setForm(prev => ({
      ...prev,
      barAdmissions: prev.barAdmissions.map((ba, i) =>
        i === index ? { ...ba, [field]: value } : ba
      ),
    }))
  }

  // ---- Multi-select toggles ----

  function toggleArrayItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
  }

  // ---- Submit ----

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Build application data for validation
    const applicationData = {
      fullName: form.fullName,
      email: form.email,
      preferredDisplayTitle: form.preferredDisplayTitle || undefined,
      barAdmissions: form.barAdmissions,
      yearsOfPractice: parseInt(form.yearsOfPractice, 10) || 0,
      currentPosition: form.currentPosition || undefined,
      institution: form.institution || undefined,
      practiceAreas: form.practiceAreas,
      jurisdictions: [] as JurisdictionCode[],
      languages: form.languages,
      contributionInterests: form.contributionInterests,
      proposedTopics: form.proposedTopics || undefined,
      statementOfInterest: form.statementOfInterest,
      writingSampleUrl: form.writingSampleUrl || undefined,
      linkedInUrl: form.linkedInUrl || undefined,
      referralSource: form.referralSource || undefined,
    }

    // Validate
    const validationErrors = validateApplication(applicationData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      // Scroll to first error
      const firstErrorField = validationErrors[0].field.split('[')[0]
      const el = document.querySelector(`[data-field="${firstErrorField}"]`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setErrors([])
    setSubmitStatus('submitting')

    try {
      const response = await fetch('/api/contributor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setForm(getInitialState())
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  // ---- Success state ----

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-3xl mb-4">&#x2713;</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {isEnglish ? 'Application Submitted' : 'Başvuru Gönderildi'}
        </h3>
        <p className="text-gray-600 mb-4">
          {isEnglish
            ? 'Thank you for your interest in contributing to EchoLegal. We will review your application and respond within 10 business days.'
            : 'EchoLegal\'a katkıda bulunmaya olan ilginiz için teşekkür ederiz. Başvurunuzu inceleyeceğiz ve 10 iş günü içinde yanıt vereceğiz.'}
        </p>
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'A confirmation has been sent to your email address.'
            : 'E-posta adresinize bir onay gönderildi.'}
        </p>
      </div>
    )
  }

  // ---- Form ----

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Section 1: Personal Information */}
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 mb-4">
          {isEnglish ? 'Personal Information' : 'Kişisel Bilgiler'}
        </legend>
        <p className="text-sm text-gray-500 mb-6">
          {isEnglish
            ? 'Your personal information is kept confidential and is never displayed publicly without your consent.'
            : 'Kişisel bilgileriniz gizli tutulur ve onayınız olmadan halka açık olarak gösterilmez.'}
        </p>

        <div className="space-y-4">
          {/* Full Name */}
          <div data-field="fullName">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Full Legal Name' : 'Tam Yasal Ad'} *
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={e => updateField('fullName', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm ${
                getFieldError('fullName') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-gray-400`}
              placeholder={isEnglish ? 'As it appears on your bar registration' : 'Baro kaydınızda göründüğü şekliyle'}
            />
            {getFieldError('fullName') && (
              <p className="text-red-600 text-xs mt-1">{getFieldError('fullName')}</p>
            )}
          </div>

          {/* Email */}
          <div data-field="email">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Email Address' : 'E-posta Adresi'} *
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm ${
                getFieldError('email') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-gray-400`}
              placeholder={isEnglish ? 'your@email.com' : 'e-posta@adresiniz.com'}
            />
            {getFieldError('email') && (
              <p className="text-red-600 text-xs mt-1">{getFieldError('email')}</p>
            )}
          </div>

          {/* Preferred Display Title */}
          <div data-field="preferredDisplayTitle">
            <label htmlFor="displayTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Preferred Display Title' : 'Tercih Edilen Görünen Unvan'}
            </label>
            <input
              id="displayTitle"
              type="text"
              value={form.preferredDisplayTitle}
              onChange={e => updateField('preferredDisplayTitle', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder={isEnglish ? 'e.g., "Immigration Attorney, California"' : 'ör., "Göçmenlik Avukatı, Kaliforniya"'}
            />
            <p className="text-xs text-gray-400 mt-1">
              {isEnglish
                ? 'How you would like to be identified on published content. Optional.'
                : 'Yayınlanan içerikte nasıl tanınmak istediğiniz. İsteğe bağlı.'}
            </p>
          </div>
        </div>
      </fieldset>

      {/* Section 2: Bar Admissions */}
      <fieldset data-field="barAdmissions">
        <legend className="text-lg font-bold text-gray-900 mb-4">
          {isEnglish ? 'Bar Admissions' : 'Baro Kayıtları'}
        </legend>
        <p className="text-sm text-gray-500 mb-6">
          {isEnglish
            ? 'All contributors must hold active bar admission. Credentials are verified before publication access is granted.'
            : 'Tüm katkıda bulunanlar aktif baro kaydına sahip olmalıdır. Yayın erişimi verilmeden önce kimlik bilgileri doğrulanır.'}
        </p>

        {getFieldError('barAdmissions') && (
          <p className="text-red-600 text-xs mb-3">{getFieldError('barAdmissions')}</p>
        )}

        <div className="space-y-4">
          {form.barAdmissions.map((ba, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {isEnglish ? `Admission ${index + 1}` : `Kayıt ${index + 1}`}
                </span>
                {form.barAdmissions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBarAdmission(index)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    {isEnglish ? 'Remove' : 'Kaldır'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {isEnglish ? 'Jurisdiction' : 'Yargı Alanı'} *
                  </label>
                  <input
                    type="text"
                    value={ba.jurisdiction}
                    onChange={e => updateBarAdmission(index, 'jurisdiction', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm ${
                      getFieldError(`barAdmissions[${index}].jurisdiction`)
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    placeholder={isEnglish ? 'e.g., New York, California' : 'ör., New York, İstanbul'}
                  />
                  {getFieldError(`barAdmissions[${index}].jurisdiction`) && (
                    <p className="text-red-600 text-xs mt-1">
                      {getFieldError(`barAdmissions[${index}].jurisdiction`)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {isEnglish ? 'Bar Number' : 'Baro Numarası'} *
                  </label>
                  <input
                    type="text"
                    value={ba.barNumber}
                    onChange={e => updateBarAdmission(index, 'barNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm ${
                      getFieldError(`barAdmissions[${index}].barNumber`)
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    placeholder={isEnglish ? 'Registration number' : 'Sicil numarası'}
                  />
                  {getFieldError(`barAdmissions[${index}].barNumber`) && (
                    <p className="text-red-600 text-xs mt-1">
                      {getFieldError(`barAdmissions[${index}].barNumber`)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {isEnglish ? 'Admission Year' : 'Kabul Yılı'} *
                  </label>
                  <input
                    type="number"
                    value={ba.admissionYear}
                    onChange={e => updateBarAdmission(index, 'admissionYear', parseInt(e.target.value, 10))}
                    className={`w-full px-3 py-2 border rounded text-sm ${
                      getFieldError(`barAdmissions[${index}].admissionYear`)
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    min={1950}
                    max={new Date().getFullYear()}
                  />
                  {getFieldError(`barAdmissions[${index}].admissionYear`) && (
                    <p className="text-red-600 text-xs mt-1">
                      {getFieldError(`barAdmissions[${index}].admissionYear`)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {isEnglish ? 'Status' : 'Durum'}
                  </label>
                  <select
                    value={ba.status}
                    onChange={e => updateBarAdmission(index, 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="active">{isEnglish ? 'Active' : 'Aktif'}</option>
                    <option value="inactive">{isEnglish ? 'Inactive' : 'Pasif'}</option>
                    <option value="retired">{isEnglish ? 'Retired' : 'Emekli'}</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addBarAdmission}
            className="text-sm text-gray-600 hover:text-gray-900 border border-dashed border-gray-300 rounded-lg px-4 py-2 w-full hover:border-gray-400 transition-colors"
          >
            + {isEnglish ? 'Add Another Bar Admission' : 'Başka Bir Baro Kaydı Ekle'}
          </button>
        </div>
      </fieldset>

      {/* Section 3: Professional Background */}
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 mb-4">
          {isEnglish ? 'Professional Background' : 'Mesleki Geçmiş'}
        </legend>

        <div className="space-y-4">
          {/* Years of Practice */}
          <div data-field="yearsOfPractice">
            <label htmlFor="yearsOfPractice" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Years of Practice' : 'Mesleki Deneyim (Yıl)'} *
            </label>
            <input
              id="yearsOfPractice"
              type="number"
              value={form.yearsOfPractice}
              onChange={e => updateField('yearsOfPractice', e.target.value)}
              className={`w-32 px-4 py-2.5 border rounded-lg text-sm ${
                getFieldError('yearsOfPractice') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-gray-400`}
              min={0}
              max={70}
            />
            {getFieldError('yearsOfPractice') && (
              <p className="text-red-600 text-xs mt-1">{getFieldError('yearsOfPractice')}</p>
            )}
          </div>

          {/* Current Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700 mb-1">
                {isEnglish ? 'Current Position' : 'Mevcut Pozisyon'}
              </label>
              <input
                id="currentPosition"
                type="text"
                value={form.currentPosition}
                onChange={e => updateField('currentPosition', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder={isEnglish ? 'e.g., Partner, Associate' : 'ör., Ortak, Avukat'}
              />
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                {isEnglish ? 'Firm / Institution' : 'Firma / Kurum'}
              </label>
              <input
                id="institution"
                type="text"
                value={form.institution}
                onChange={e => updateField('institution', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder={isEnglish ? 'Firm or university name' : 'Firma veya üniversite adı'}
              />
            </div>
          </div>

          {/* Practice Areas */}
          <div data-field="practiceAreas">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEnglish ? 'Practice Areas' : 'Uzmanlık Alanları'} *
            </label>
            {getFieldError('practiceAreas') && (
              <p className="text-red-600 text-xs mb-2">{getFieldError('practiceAreas')}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PRACTICE_AREA_LABELS) as PracticeArea[]).map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => updateField('practiceAreas', toggleArrayItem(form.practiceAreas, area))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    form.practiceAreas.includes(area)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {PRACTICE_AREA_LABELS[area][lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div data-field="languages">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEnglish ? 'Languages (for legal writing)' : 'Diller (hukuki yazım için)'} *
            </label>
            {getFieldError('languages') && (
              <p className="text-red-600 text-xs mb-2">{getFieldError('languages')}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => updateField('languages', toggleArrayItem(form.languages, code))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    form.languages.includes(code)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {label[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Section 4: Contribution Preferences */}
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 mb-4">
          {isEnglish ? 'Contribution Preferences' : 'Katkı Tercihleri'}
        </legend>

        <div className="space-y-4">
          {/* Contribution Interests */}
          <div data-field="contributionInterests">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEnglish ? 'Types of Contributions' : 'Katkı Türleri'} *
            </label>
            {getFieldError('contributionInterests') && (
              <p className="text-red-600 text-xs mb-2">{getFieldError('contributionInterests')}</p>
            )}
            <div className="space-y-2">
              {(Object.keys(CONTRIBUTION_INTEREST_LABELS) as ContributionInterest[]).map(interest => (
                <label
                  key={interest}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={form.contributionInterests.includes(interest)}
                    onChange={() =>
                      updateField(
                        'contributionInterests',
                        toggleArrayItem(form.contributionInterests, interest)
                      )
                    }
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {CONTRIBUTION_INTEREST_LABELS[interest][lang]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Proposed Topics */}
          <div>
            <label htmlFor="proposedTopics" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Proposed Topics' : 'Önerilen Konular'}
            </label>
            <textarea
              id="proposedTopics"
              value={form.proposedTopics}
              onChange={e => updateField('proposedTopics', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"
              placeholder={isEnglish
                ? 'Brief description of legal topics you would like to cover...'
                : 'Ele almak istediğiniz hukuki konuların kısa açıklaması...'}
            />
          </div>

          {/* Statement of Interest */}
          <div data-field="statementOfInterest">
            <label htmlFor="statementOfInterest" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Statement of Interest' : 'İlgi Beyanı'} *
            </label>
            <textarea
              id="statementOfInterest"
              value={form.statementOfInterest}
              onChange={e => updateField('statementOfInterest', e.target.value)}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm ${
                getFieldError('statementOfInterest') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y`}
              placeholder={isEnglish
                ? 'Why are you interested in contributing to EchoLegal? (2-5 sentences)'
                : 'EchoLegal\'a neden katkıda bulunmak istiyorsunuz? (2-5 cümle)'}
            />
            <div className="flex justify-between mt-1">
              {getFieldError('statementOfInterest') ? (
                <p className="text-red-600 text-xs">{getFieldError('statementOfInterest')}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-gray-400">
                {form.statementOfInterest.length}/2000
              </span>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Section 5: Optional Information */}
      <fieldset>
        <legend className="text-lg font-bold text-gray-900 mb-4">
          {isEnglish ? 'Additional Information' : 'Ek Bilgiler'}
        </legend>
        <p className="text-sm text-gray-500 mb-4">
          {isEnglish ? 'Optional but helpful for our review.' : 'İsteğe bağlı ancak incelememiz için faydalıdır.'}
        </p>

        <div className="space-y-4">
          {/* Writing Sample URL */}
          <div>
            <label htmlFor="writingSampleUrl" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Published Writing Sample (URL)' : 'Yayınlanmış Yazı Örneği (URL)'}
            </label>
            <input
              id="writingSampleUrl"
              type="url"
              value={form.writingSampleUrl}
              onChange={e => updateField('writingSampleUrl', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="https://"
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <label htmlFor="linkedInUrl" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'LinkedIn Profile' : 'LinkedIn Profili'}
            </label>
            <input
              id="linkedInUrl"
              type="url"
              value={form.linkedInUrl}
              onChange={e => updateField('linkedInUrl', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Referral Source */}
          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'How did you hear about EchoLegal?' : 'EchoLegal\'ı nasıl duydunuz?'}
            </label>
            <input
              id="referralSource"
              type="text"
              value={form.referralSource}
              onChange={e => updateField('referralSource', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder={isEnglish ? 'e.g., Google, colleague, conference' : 'ör., Google, meslektaş, konferans'}
            />
          </div>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="border-t border-gray-200 pt-6">
        {/* Error summary */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-red-700 font-medium">
              {isEnglish
                ? `Please correct ${errors.length} error${errors.length > 1 ? 's' : ''} before submitting.`
                : `Göndermeden önce ${errors.length} hatayı düzeltin.`}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-red-700">
              {isEnglish
                ? 'An error occurred while submitting your application. Please try again or contact contribute@echo-legal.com.'
                : 'Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya contribute@echo-legal.com adresine yazın.'}
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500 mb-4">
          {isEnglish
            ? 'By submitting this application, you confirm that the information provided is accurate and that you consent to credential verification by EchoLegal.'
            : 'Bu başvuruyu göndererek, sağlanan bilgilerin doğru olduğunu ve EchoLegal tarafından kimlik bilgisi doğrulamasına onay verdiğinizi teyit edersiniz.'}
        </p>

        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
            submitStatus === 'submitting'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800'
          }`}
        >
          {submitStatus === 'submitting'
            ? (isEnglish ? 'Submitting...' : 'Gönderiliyor...')
            : (isEnglish ? 'Submit Application' : 'Başvuruyu Gönder')}
        </button>
      </div>
    </form>
  )
}

