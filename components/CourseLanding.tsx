'use client'

/**
 * Course and Webinar Landing Page Components
 * Templates for selling online courses and webinars
 */

import { useState } from 'react'
import Disclaimer from './Disclaimer'

interface CourseModule {
  title: string
  titleTr: string
  lessons: {
    title: string
    titleTr: string
    duration: string
    free?: boolean
  }[]
}

interface CourseProps {
  course: {
    id: string
    title: string
    titleTr: string
    subtitle: string
    subtitleTr: string
    description: string
    descriptionTr: string
    instructor: {
      name: string
      bio: string
      bioTr: string
      image?: string
    }
    price: number
    originalPrice?: number
    currency: string
    modules: CourseModule[]
    features: string[]
    featuresTr: string[]
    testimonials?: {
      name: string
      text: string
      textTr: string
    }[]
    // Integration URLs
    teachableUrl?: string
    podiaUrl?: string
    stripePriceId?: string
  }
  lang: 'en' | 'tr'
}

interface WebinarProps {
  webinar: {
    id: string
    title: string
    titleTr: string
    description: string
    descriptionTr: string
    host: {
      name: string
      title: string
      titleTr: string
      image?: string
    }
    date: string
    time: string
    timezone: string
    duration: string
    price: number
    isFree: boolean
    registrationUrl: string
    topics: string[]
    topicsTr: string[]
  }
  lang: 'en' | 'tr'
}

/**
 * Course Landing Page Template
 */
export function CourseLanding({ course, lang }: CourseProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0)
  const isEnglish = lang === 'en'

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const totalDuration = course.modules
    .flatMap((m) => m.lessons)
    .reduce((acc, l) => {
      const mins = parseInt(l.duration) || 0
      return acc + mins
    }, 0)

  const handleEnroll = () => {
    // Priority: Teachable > Podia > Stripe
    if (course.teachableUrl) {
      window.location.href = course.teachableUrl
    } else if (course.podiaUrl) {
      window.location.href = course.podiaUrl
    } else if (course.stripePriceId) {
      // Handle Stripe checkout
      window.location.href = `/api/checkout?type=course&id=${course.id}`
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#C9A227] text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                {isEnglish ? 'ONLINE COURSE' : 'ONLİNE KURS'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {isEnglish ? course.title : course.titleTr}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {isEnglish ? course.subtitle : course.subtitleTr}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <span>📚 {totalLessons} {isEnglish ? 'lessons' : 'ders'}</span>
                <span>⏱️ {Math.round(totalDuration / 60)} {isEnglish ? 'hours' : 'saat'}</span>
                <span>🌐 {isEnglish ? 'English & Turkish' : 'İngilizce ve Türkçe'}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="bg-[#C9A227] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#B8922A] transition-colors"
                >
                  {isEnglish ? 'Enroll Now' : 'Şimdi Kaydol'} - ${course.price}
                </button>
                {course.originalPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gray-700 rounded-xl p-8 aspect-video flex items-center justify-center">
                <span className="text-6xl">🎓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? 'About This Course' : 'Bu Kurs Hakkında'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {isEnglish ? course.description : course.descriptionTr}
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4">
            {(isEnglish ? course.features : course.featuresTr).map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? 'Course Curriculum' : 'Kurs Müfredatı'}
          </h2>

          <div className="space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50"
                >
                  <div>
                    <span className="text-sm text-gray-500">
                      {isEnglish ? 'Module' : 'Modül'} {moduleIndex + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {isEnglish ? module.title : module.titleTr}
                    </h3>
                  </div>
                  <span className="text-2xl text-gray-400">
                    {expandedModule === moduleIndex ? '−' : '+'}
                  </span>
                </button>

                {expandedModule === moduleIndex && (
                  <div className="border-t border-gray-100 p-6 pt-0">
                    <ul className="space-y-3 mt-4">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">▶</span>
                            <span className="text-gray-700">
                              {isEnglish ? lesson.title : lesson.titleTr}
                            </span>
                            {lesson.free && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {isEnglish ? 'FREE' : 'ÜCRETSİZ'}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? 'Your Instructor' : 'Eğitmeniniz'}
          </h2>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
              {course.instructor.image ? (
                <img src={course.instructor.image} alt={course.instructor.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                '👤'
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{course.instructor.name}</h3>
              <p className="text-gray-600 mt-2">
                {isEnglish ? course.instructor.bio : course.instructor.bioTr}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isEnglish ? 'Ready to Get Started?' : 'Başlamaya Hazır Mısınız?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {isEnglish
              ? 'Join hundreds of students already learning.'
              : 'Halihazırda öğrenen yüzlerce öğrenciye katılın.'}
          </p>
          <button
            onClick={handleEnroll}
            className="bg-[#C9A227] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#B8922A] transition-colors"
          >
            {isEnglish ? 'Enroll Now' : 'Şimdi Kaydol'} - ${course.price}
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <Disclaimer lang={lang} variant="compact" />
      </div>
    </div>
  )
}

/**
 * Webinar Registration Template
 */
export function WebinarLanding({ webinar, lang }: WebinarProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const isEnglish = lang === 'en'

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // If external registration URL, redirect
    if (webinar.registrationUrl) {
      window.location.href = webinar.registrationUrl
      return
    }

    // Otherwise, handle registration locally
    try {
      await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, webinarId: webinar.id }),
      })
      setIsRegistered(true)
    } catch (error) {
      alert(isEnglish ? 'Registration failed. Please try again.' : 'Kayıt başarısız. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            {webinar.isFree
              ? (isEnglish ? 'FREE WEBINAR' : 'ÜCRETSİZ WEBİNAR')
              : (isEnglish ? 'LIVE WEBINAR' : 'CANLI WEBİNAR')}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? webinar.title : webinar.titleTr}
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            {isEnglish ? webinar.description : webinar.descriptionTr}
          </p>

          {/* Date/Time */}
          <div className="flex flex-wrap justify-center gap-6 text-lg mb-8">
            <span>📅 {webinar.date}</span>
            <span>🕐 {webinar.time} {webinar.timezone}</span>
            <span>⏱️ {webinar.duration}</span>
          </div>

          {/* Registration Form */}
          {!isRegistered ? (
            <form onSubmit={handleRegister} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEnglish ? 'Enter your email' : 'E-postanızı girin'}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C9A227] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8922A] transition-colors disabled:opacity-50"
              >
                {isSubmitting
                  ? '...'
                  : (isEnglish ? 'Register' : 'Kaydol')}
              </button>
            </form>
          ) : (
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg inline-block">
              ✓ {isEnglish ? 'Registered! Check your email.' : 'Kayıt olundu! E-postanızı kontrol edin.'}
            </div>
          )}
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isEnglish ? 'What You\'ll Learn' : 'Neler Öğreneceksiniz'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(isEnglish ? webinar.topics : webinar.topicsTr).map((topic, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-blue-500 text-xl">✓</span>
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? 'Your Host' : 'Sunucunuz'}
          </h2>
          <div className="inline-block">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
              {webinar.host.image ? (
                <img src={webinar.host.image} alt={webinar.host.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                '👤'
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{webinar.host.name}</h3>
            <p className="text-gray-600">{isEnglish ? webinar.host.title : webinar.host.titleTr}</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <Disclaimer lang={lang} variant="compact" />
      </div>
    </div>
  )
}
