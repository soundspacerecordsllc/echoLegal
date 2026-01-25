'use client'

/**
 * Ad Slot Components
 * Asynchronous ad loading with lazy loading support
 */

import { useEffect, useRef, useState } from 'react'
import { adsConfig, getAdSlotConfig, isAdsEnabledForPage } from '@/lib/ads-config'

interface AdSlotProps {
  slotId: string
  pageName?: string
  className?: string
}

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'in-content' | 'sticky-footer'
  pageName?: string
  className?: string
}

/**
 * AdSense initialization script
 * Add this to your root layout or _app.tsx
 */
export function AdSenseScript() {
  if (!adsConfig.enabled || !adsConfig.adsense.enabled) return null

  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.adsense.publisherId}`}
        crossOrigin="anonymous"
      />
      {adsConfig.adsense.autoAds && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "${adsConfig.adsense.publisherId}",
                enable_page_level_ads: true
              });
            `,
          }}
        />
      )}
    </>
  )
}

/**
 * Individual ad slot component with lazy loading
 */
export function AdSlot({ slotId, pageName = 'default', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const slotConfig = getAdSlotConfig(slotId)

  useEffect(() => {
    if (!adsConfig.enabled || !slotConfig) return

    // Check if ads are enabled for this page
    if (pageName !== 'default' && !isAdsEnabledForPage(pageName)) return

    // Lazy loading with Intersection Observer
    if (adsConfig.lazyLoad.enabled) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              observer.disconnect()
            }
          })
        },
        { rootMargin: adsConfig.lazyLoad.rootMargin }
      )

      if (adRef.current) {
        observer.observe(adRef.current)
      }

      return () => observer.disconnect()
    } else {
      setIsVisible(true)
    }
  }, [slotConfig, pageName])

  useEffect(() => {
    if (!isVisible || isLoaded || !adsConfig.enabled) return

    // Initialize AdSense ad
    try {
      // @ts-ignore - AdSense global
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      setIsLoaded(true)
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [isVisible, isLoaded])

  if (!adsConfig.enabled || !slotConfig) return null
  if (pageName !== 'default' && !isAdsEnabledForPage(pageName)) return null

  return (
    <div
      ref={adRef}
      className={`ad-slot ad-slot-${slotConfig.type} ${className}`}
      style={{
        minHeight: slotConfig.size.desktop.height,
        minWidth: slotConfig.size.desktop.width,
      }}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
          data-ad-client={adsConfig.adsense.publisherId}
          data-ad-slot={slotConfig.adUnitId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}

/**
 * Header banner ad
 */
export function HeaderBannerAd({ pageName, className = '' }: Omit<AdBannerProps, 'position'>) {
  return <AdSlot slotId="header-banner" pageName={pageName} className={`my-4 ${className}`} />
}

/**
 * Sidebar ad
 */
export function SidebarAd({ pageName, className = '' }: Omit<AdBannerProps, 'position'>) {
  return (
    <div className={`hidden lg:block ${className}`}>
      <AdSlot slotId="sidebar-ad" pageName={pageName} />
    </div>
  )
}

/**
 * In-content ad (for articles)
 */
export function InContentAd({ pageName, className = '' }: Omit<AdBannerProps, 'position'>) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdSlot slotId="in-content-ad" pageName={pageName} />
    </div>
  )
}

/**
 * Sticky footer ad
 */
export function StickyFooterAd({ pageName, className = '' }: Omit<AdBannerProps, 'position'>) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40 ${className}`}>
      <div className="max-w-4xl mx-auto relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 right-0 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-300"
          aria-label="Close ad"
        >
          ×
        </button>
        <AdSlot slotId="sticky-footer" pageName={pageName} />
      </div>
    </div>
  )
}

/**
 * Ad placeholder for development/testing
 */
export function AdPlaceholder({
  width = 728,
  height = 90,
  label = 'Ad Placeholder',
}: {
  width?: number
  height?: number
  label?: string
}) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div
      className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm"
      style={{ width, height }}
    >
      {label} ({width}x{height})
    </div>
  )
}
