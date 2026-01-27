'use client'

import { useState, useEffect } from 'react'

type Lang = 'en' | 'tr'

// Question/Answer type definitions
interface Answer {
  id: string
  labelEn: string
  labelTr: string
  descriptionEn?: string
  descriptionTr?: string
  nextQuestion?: string
  outcome?: Outcome
}

interface Question {
  id: string
  titleEn: string
  titleTr: string
  explanationEn: string
  explanationTr: string
  answers: Answer[]
}

interface Outcome {
  form: 'W-9' | 'W-8BEN' | 'W-8BEN-E'
  summaryEn: string
  summaryTr: string
  detailsEn: string[]
  detailsTr: string[]
  nextStepsEn: string[]
  nextStepsTr: string[]
}

// Decision tree data
const questions: Question[] = [
  {
    id: 'q1-us-person',
    titleEn: 'Are you a "US person" for tax purposes?',
    titleTr: 'Vergi açısından "ABD kişisi" misiniz?',
    explanationEn: 'A "US person" includes: US citizens (even living abroad), US resident aliens (green card holders or those meeting the substantial presence test), and US entities (LLCs, corporations formed in any US state).',
    explanationTr: '"ABD kişisi" şunları içerir: ABD vatandaşları (yurtdışında yaşasalar bile), ABD\'de mukim yabancılar (yeşil kart sahipleri veya önemli varlık testini karşılayanlar) ve ABD tüzel kişileri (herhangi bir ABD eyaletinde kurulan LLC, şirketler).',
    answers: [
      {
        id: 'us-person-yes',
        labelEn: 'Yes, I am a US person',
        labelTr: 'Evet, ABD kişisiyim',
        descriptionEn: 'US citizen, green card holder, or US entity',
        descriptionTr: 'ABD vatandaşı, yeşil kart sahibi veya ABD şirketi',
        outcome: {
          form: 'W-9',
          summaryEn: 'You need to complete Form W-9',
          summaryTr: 'W-9 Formunu doldurmanız gerekiyor',
          detailsEn: [
            'Form W-9 is used by US persons to certify their taxpayer identification number (TIN)',
            'Your TIN will be your SSN (for individuals) or EIN (for businesses)',
            'The requester will use this to report payments to the IRS',
            'You may receive a 1099 at year-end showing payments made to you',
          ],
          detailsTr: [
            'W-9 Formu, ABD kişileri tarafından vergi kimlik numaralarını (TIN) onaylamak için kullanılır',
            'TIN\'iniz SSN (bireyler için) veya EIN (işletmeler için) olacaktır',
            'Talep eden, bunu IRS\'e ödemeleri bildirmek için kullanacaktır',
            'Yıl sonunda size yapılan ödemeleri gösteren bir 1099 alabilirsiniz',
          ],
          nextStepsEn: [
            'Download Form W-9 from irs.gov',
            'Complete Parts I and II with your information',
            'Sign and date the form',
            'Return to the requesting party (do NOT send to IRS)',
          ],
          nextStepsTr: [
            'W-9 Formunu irs.gov\'dan indirin',
            'Bölüm I ve II\'yi bilgilerinizle doldurun',
            'Formu imzalayın ve tarih atın',
            'Talep eden tarafa iade edin (IRS\'e GÖNDERMEYİN)',
          ],
        },
      },
      {
        id: 'us-person-no',
        labelEn: 'No, I am not a US person',
        labelTr: 'Hayır, ABD kişisi değilim',
        descriptionEn: 'Foreign national, non-resident, foreign entity',
        descriptionTr: 'Yabancı uyruklu, mukim olmayan, yabancı şirket',
        nextQuestion: 'q2-entity-type',
      },
      {
        id: 'us-person-unsure',
        labelEn: 'I\'m not sure',
        labelTr: 'Emin değilim',
        descriptionEn: 'I need help determining my status',
        descriptionTr: 'Durumumu belirlemede yardıma ihtiyacım var',
        nextQuestion: 'q1b-clarify-status',
      },
    ],
  },
  {
    id: 'q1b-clarify-status',
    titleEn: 'Let\'s clarify your US person status',
    titleTr: 'ABD kişisi durumunuzu netleştirelim',
    explanationEn: 'Select the option that best describes your situation:',
    explanationTr: 'Durumunuzu en iyi tanımlayan seçeneği seçin:',
    answers: [
      {
        id: 'clarify-citizen',
        labelEn: 'I am a US citizen (by birth or naturalization)',
        labelTr: 'ABD vatandaşıyım (doğumla veya vatandaşlık ile)',
        outcome: {
          form: 'W-9',
          summaryEn: 'As a US citizen, you are a US person and need Form W-9',
          summaryTr: 'ABD vatandaşı olarak ABD kişisisiniz ve W-9 Formuna ihtiyacınız var',
          detailsEn: [
            'US citizens are US persons regardless of where they live',
            'You must report worldwide income to the IRS',
            'Form W-9 certifies your status to US payers',
          ],
          detailsTr: [
            'ABD vatandaşları nerede yaşarlarsa yaşasınlar ABD kişisidir',
            'Dünya çapındaki gelirinizi IRS\'e bildirmelisiniz',
            'W-9 Formu ABD ödeyicilerine statünüzü onaylar',
          ],
          nextStepsEn: [
            'Complete Form W-9 with your SSN',
            'If you don\'t have an SSN, you may need to apply for one',
          ],
          nextStepsTr: [
            'W-9 Formunu SSN\'inizle doldurun',
            'SSN\'iniz yoksa başvurmanız gerekebilir',
          ],
        },
      },
      {
        id: 'clarify-greencard',
        labelEn: 'I have a US green card (permanent resident)',
        labelTr: 'ABD yeşil kartım var (daimi ikamet)',
        outcome: {
          form: 'W-9',
          summaryEn: 'As a green card holder, you are a US person and need Form W-9',
          summaryTr: 'Yeşil kart sahibi olarak ABD kişisisiniz ve W-9 Formuna ihtiyacınız var',
          detailsEn: [
            'Green card holders are considered US residents for tax purposes',
            'You are treated as a US person from the first day of residency',
            'Form W-9 is the correct form for you',
          ],
          detailsTr: [
            'Yeşil kart sahipleri vergi açısından ABD mukimi sayılır',
            'İkamet ilk gününden itibaren ABD kişisi olarak kabul edilirsiniz',
            'W-9 Formu sizin için doğru formdur',
          ],
          nextStepsEn: ['Complete Form W-9 with your SSN'],
          nextStepsTr: ['W-9 Formunu SSN\'inizle doldurun'],
        },
      },
      {
        id: 'clarify-usllc',
        labelEn: 'I formed a US LLC or corporation',
        labelTr: 'ABD LLC veya şirketi kurdum',
        outcome: {
          form: 'W-9',
          summaryEn: 'Your US LLC/corporation is a US person and needs Form W-9',
          summaryTr: 'ABD LLC/şirketiniz ABD kişisidir ve W-9 Formuna ihtiyacı var',
          detailsEn: [
            'US entities (LLCs, corporations) formed in any US state are US persons',
            'The LLC provides W-9 using its EIN',
            'Your personal status as owner doesn\'t change the entity\'s status',
            'Even if you\'re a foreign owner, the US entity is still a US person',
          ],
          detailsTr: [
            'Herhangi bir ABD eyaletinde kurulan ABD tüzel kişileri (LLC, şirketler) ABD kişisidir',
            'LLC, EIN\'ini kullanarak W-9 sağlar',
            'Sahip olarak kişisel statünüz tüzel kişinin statüsünü değiştirmez',
            'Yabancı sahip olsanız bile ABD tüzel kişisi hâlâ ABD kişisidir',
          ],
          nextStepsEn: [
            'Complete Form W-9 for the LLC using the LLC\'s EIN',
            'If you don\'t have an EIN yet, apply for one first',
          ],
          nextStepsTr: [
            'LLC için W-9 Formunu LLC\'nin EIN\'ini kullanarak doldurun',
            'EIN\'iniz yoksa önce başvurun',
          ],
        },
      },
      {
        id: 'clarify-foreign',
        labelEn: 'I\'m a foreign national with no US status',
        labelTr: 'ABD statüsü olmayan yabancı uyrukluyum',
        nextQuestion: 'q2-entity-type',
      },
    ],
  },
  {
    id: 'q2-entity-type',
    titleEn: 'Are you providing this form as an individual or as an entity?',
    titleTr: 'Bu formu birey olarak mı yoksa tüzel kişi olarak mı veriyorsunuz?',
    explanationEn: 'This determines whether you use W-8BEN (for individuals) or W-8BEN-E (for entities like corporations, partnerships, or trusts).',
    explanationTr: 'Bu, W-8BEN (bireyler için) mi yoksa W-8BEN-E (şirketler, ortaklıklar veya tröstler gibi tüzel kişiler için) mi kullanacağınızı belirler.',
    answers: [
      {
        id: 'entity-individual',
        labelEn: 'Individual (personal capacity)',
        labelTr: 'Birey (kişisel kapasite)',
        descriptionEn: 'I\'m providing services or receiving income personally',
        descriptionTr: 'Kişisel olarak hizmet veriyorum veya gelir alıyorum',
        outcome: {
          form: 'W-8BEN',
          summaryEn: 'You need Form W-8BEN (Certificate of Foreign Status of Beneficial Owner)',
          summaryTr: 'W-8BEN Formuna ihtiyacınız var (Gerçek Hak Sahibinin Yabancı Statüsü Belgesi)',
          detailsEn: [
            'W-8BEN is for foreign individuals receiving US-source income',
            'Establishes your foreign status to avoid or reduce US withholding',
            'May allow you to claim tax treaty benefits if applicable',
            'Valid for 3 years from the date of signing (unless circumstances change)',
            'You\'ll need to provide your foreign tax identification number',
          ],
          detailsTr: [
            'W-8BEN, ABD kaynaklı gelir alan yabancı bireyler içindir',
            'ABD stopajından kaçınmak veya azaltmak için yabancı statünüzü belirler',
            'Uygulanabilirse vergi anlaşması avantajlarını talep etmenizi sağlayabilir',
            'İmza tarihinden itibaren 3 yıl geçerlidir (koşullar değişmedikçe)',
            'Yabancı vergi kimlik numaranızı sağlamanız gerekecektir',
          ],
          nextStepsEn: [
            'Download Form W-8BEN from irs.gov',
            'Complete Part I with your personal information',
            'Complete Part II if claiming treaty benefits (US-Turkey treaty may apply)',
            'Sign and date in Part III',
            'Return to the requesting party',
          ],
          nextStepsTr: [
            'W-8BEN Formunu irs.gov\'dan indirin',
            'Bölüm I\'i kişisel bilgilerinizle doldurun',
            'Anlaşma avantajları talep ediyorsanız Bölüm II\'yi doldurun (ABD-Türkiye anlaşması geçerli olabilir)',
            'Bölüm III\'te imzalayın ve tarih atın',
            'Talep eden tarafa iade edin',
          ],
        },
      },
      {
        id: 'entity-company',
        labelEn: 'Entity (company, partnership, trust)',
        labelTr: 'Tüzel kişi (şirket, ortaklık, tröst)',
        descriptionEn: 'A foreign business entity is receiving the income',
        descriptionTr: 'Yabancı bir iş tüzel kişisi gelir alıyor',
        outcome: {
          form: 'W-8BEN-E',
          summaryEn: 'You need Form W-8BEN-E (Certificate of Status of Beneficial Owner for Entities)',
          summaryTr: 'W-8BEN-E Formuna ihtiyacınız var (Tüzel Kişiler için Gerçek Hak Sahibi Statüsü Belgesi)',
          detailsEn: [
            'W-8BEN-E is for foreign entities receiving US-source income',
            'More complex than W-8BEN due to FATCA (Chapter 4) requirements',
            'Requires entity classification and FATCA status determination',
            'May allow treaty benefits for certain income types',
            'Valid for 3 years from signing (unless circumstances change)',
          ],
          detailsTr: [
            'W-8BEN-E, ABD kaynaklı gelir alan yabancı tüzel kişiler içindir',
            'FATCA (Bölüm 4) gereksinimleri nedeniyle W-8BEN\'den daha karmaşıktır',
            'Tüzel kişi sınıflandırması ve FATCA statüsü belirleme gerektirir',
            'Belirli gelir türleri için anlaşma avantajlarına izin verebilir',
            'İmzadan itibaren 3 yıl geçerlidir (koşullar değişmedikçe)',
          ],
          nextStepsEn: [
            'Download Form W-8BEN-E from irs.gov (it\'s lengthy—plan accordingly)',
            'Determine your entity type and FATCA status',
            'Complete required parts based on your classification',
            'Consider consulting a tax professional due to complexity',
            'Return completed form to the requesting party',
          ],
          nextStepsTr: [
            'W-8BEN-E Formunu irs.gov\'dan indirin (uzun—buna göre planlayın)',
            'Tüzel kişi türünüzü ve FATCA statünüzü belirleyin',
            'Sınıflandırmanıza göre gerekli bölümleri doldurun',
            'Karmaşıklık nedeniyle bir vergi uzmanına danışmayı düşünün',
            'Tamamlanan formu talep eden tarafa iade edin',
          ],
        },
      },
    ],
  },
]

// Component props
interface W8W9DecisionToolProps {
  lang: Lang
}

export default function W8W9DecisionTool({ lang }: W8W9DecisionToolProps) {
  const isEnglish = lang === 'en'

  // State
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('q1-us-person')
  const [answers, setAnswers] = useState<{ questionId: string; answerId: string }[]>([])
  const [outcome, setOutcome] = useState<Outcome | null>(null)

  // Get current question
  const currentQuestion = questions.find((q) => q.id === currentQuestionId)

  // Calculate progress
  const progressPercentage = outcome ? 100 : (answers.length / 3) * 100

  // Handle answer selection
  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, { questionId: currentQuestionId, answerId: answer.id }]
    setAnswers(newAnswers)

    if (answer.outcome) {
      setOutcome(answer.outcome)
    } else if (answer.nextQuestion) {
      setCurrentQuestionId(answer.nextQuestion)
    }

    // Scroll to top of tool
    document.getElementById('decision-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Handle back
  const handleBack = () => {
    if (answers.length === 0) return

    const prevAnswers = answers.slice(0, -1)
    setAnswers(prevAnswers)
    setOutcome(null)

    // Find the previous question
    if (prevAnswers.length === 0) {
      setCurrentQuestionId('q1-us-person')
    } else {
      const lastAnswer = prevAnswers[prevAnswers.length - 1]
      const question = questions.find((q) => q.id === lastAnswer.questionId)
      const answer = question?.answers.find((a) => a.id === lastAnswer.answerId)
      if (answer?.nextQuestion) {
        setCurrentQuestionId(answer.nextQuestion)
      }
    }
  }

  // Handle reset
  const handleReset = () => {
    setAnswers([])
    setOutcome(null)
    setCurrentQuestionId('q1-us-person')
    document.getElementById('decision-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Build summary of selections
  const getSummaryText = () => {
    if (answers.length === 0) return null

    const summaryParts: string[] = []
    answers.forEach((a) => {
      const question = questions.find((q) => q.id === a.questionId)
      const answer = question?.answers.find((ans) => ans.id === a.answerId)
      if (answer) {
        summaryParts.push(isEnglish ? answer.labelEn : answer.labelTr)
      }
    })

    return summaryParts.join(' → ')
  }

  return (
    <div id="decision-tool" className="scroll-mt-20">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{isEnglish ? 'Progress' : 'İlerleme'}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Live summary */}
      {answers.length > 0 && !outcome && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>{isEnglish ? 'Your selections:' : 'Seçimleriniz:'}</strong>{' '}
            {getSummaryText()}
          </p>
        </div>
      )}

      {/* Question or Outcome */}
      {outcome ? (
        // Outcome display
        <div className="space-y-6">
          {/* Result header */}
          <div className={`rounded-xl p-6 ${
            outcome.form === 'W-9'
              ? 'bg-blue-50 border-2 border-blue-300'
              : outcome.form === 'W-8BEN'
              ? 'bg-green-50 border-2 border-green-300'
              : 'bg-purple-50 border-2 border-purple-300'
          }`}>
            <div className="text-center">
              <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold mb-3 ${
                outcome.form === 'W-9'
                  ? 'bg-blue-600 text-white'
                  : outcome.form === 'W-8BEN'
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}>
                {outcome.form}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? outcome.summaryEn : outcome.summaryTr}
              </h3>
              <p className="text-sm text-gray-600">
                {getSummaryText()}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">
              {isEnglish ? 'What This Means' : 'Bu Ne Anlama Geliyor'}
            </h4>
            <ul className="space-y-2">
              {(isEnglish ? outcome.detailsEn : outcome.detailsTr).map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next steps */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">
              {isEnglish ? 'Next Steps' : 'Sonraki Adımlar'}
            </h4>
            <ol className="space-y-3">
              {(isEnglish ? outcome.nextStepsEn : outcome.nextStepsTr).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              ← {isEnglish ? 'Go Back' : 'Geri Git'}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {isEnglish ? 'Start Over' : 'Yeniden Başla'}
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        // Question display
        <div className="space-y-6">
          {/* Question header */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {isEnglish ? currentQuestion.titleEn : currentQuestion.titleTr}
            </h3>
            <p className="text-gray-600">
              {isEnglish ? currentQuestion.explanationEn : currentQuestion.explanationTr}
            </p>
          </div>

          {/* Answer options - CLICKABLE CARDS */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswer(answer)}
                className="w-full text-left p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                      {isEnglish ? answer.labelEn : answer.labelTr}
                    </p>
                    {(isEnglish ? answer.descriptionEn : answer.descriptionTr) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {isEnglish ? answer.descriptionEn : answer.descriptionTr}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Back button (if not first question) */}
          {answers.length > 0 && (
            <button
              onClick={handleBack}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              ← {isEnglish ? 'Go Back' : 'Geri Git'}
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
