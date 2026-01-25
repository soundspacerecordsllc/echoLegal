/**
 * Display Ads Configuration
 * Configure ad placements, networks, and page-level settings
 */

export interface AdSlot {
  id: string
  name: string
  type: 'banner' | 'sidebar' | 'inline' | 'sticky'
  size: {
    desktop: { width: number; height: number }
    mobile: { width: number; height: number }
  }
  position: 'top' | 'bottom' | 'sidebar' | 'in-content' | 'sticky-footer'
}

export interface PageAdConfig {
  enabled: boolean
  slots: string[] // Array of slot IDs to display on this page
}

/**
 * Global ads configuration
 */
export const adsConfig = {
  // Master switch to enable/disable all ads
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',

  // Google AdSense configuration
  adsense: {
    enabled: true,
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense publisher ID
    autoAds: false, // Set to true to enable Auto Ads
  },

  // Ad slots definition
  slots: {
    headerBanner: {
      id: 'header-banner',
      name: 'Header Banner',
      type: 'banner' as const,
      size: {
        desktop: { width: 728, height: 90 },
        mobile: { width: 320, height: 50 },
      },
      position: 'top' as const,
      adUnitId: 'XXXXXXXXXX', // Replace with your ad unit ID
    },
    sidebarAd: {
      id: 'sidebar-ad',
      name: 'Sidebar Ad',
      type: 'sidebar' as const,
      size: {
        desktop: { width: 300, height: 250 },
        mobile: { width: 300, height: 250 },
      },
      position: 'sidebar' as const,
      adUnitId: 'XXXXXXXXXX', // Replace with your ad unit ID
    },
    inContentAd: {
      id: 'in-content-ad',
      name: 'In-Content Ad',
      type: 'inline' as const,
      size: {
        desktop: { width: 336, height: 280 },
        mobile: { width: 300, height: 250 },
      },
      position: 'in-content' as const,
      adUnitId: 'XXXXXXXXXX', // Replace with your ad unit ID
    },
    stickyFooter: {
      id: 'sticky-footer',
      name: 'Sticky Footer',
      type: 'sticky' as const,
      size: {
        desktop: { width: 728, height: 90 },
        mobile: { width: 320, height: 50 },
      },
      position: 'sticky-footer' as const,
      adUnitId: 'XXXXXXXXXX', // Replace with your ad unit ID
    },
  },

  // Page-specific ad configurations
  // Set enabled: false to disable ads on specific pages
  pages: {
    home: {
      enabled: true,
      slots: ['header-banner', 'sidebar-ad'],
    },
    library: {
      enabled: true,
      slots: ['header-banner', 'sidebar-ad', 'in-content-ad'],
    },
    contracts: {
      enabled: true,
      slots: ['header-banner', 'sidebar-ad'],
    },
    legalKits: {
      enabled: false, // Disable ads on product pages
      slots: [],
    },
    article: {
      enabled: true,
      slots: ['header-banner', 'in-content-ad', 'sticky-footer'],
    },
    checkout: {
      enabled: false, // Never show ads on checkout
      slots: [],
    },
    membership: {
      enabled: false, // Don't show ads to potential members
      slots: [],
    },
  } as Record<string, PageAdConfig>,

  // Responsive breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },

  // Ad refresh settings (in seconds)
  refreshInterval: 30,

  // Lazy loading settings
  lazyLoad: {
    enabled: true,
    rootMargin: '200px',
  },
}

/**
 * Check if ads are enabled for a specific page
 */
export function isAdsEnabledForPage(pageName: string): boolean {
  if (!adsConfig.enabled) return false
  const pageConfig = adsConfig.pages[pageName]
  return pageConfig?.enabled ?? true
}

/**
 * Get ad slots for a specific page
 */
export function getAdSlotsForPage(pageName: string): string[] {
  if (!isAdsEnabledForPage(pageName)) return []
  return adsConfig.pages[pageName]?.slots || []
}

/**
 * Get slot configuration by ID
 */
export function getAdSlotConfig(slotId: string) {
  return Object.values(adsConfig.slots).find((slot) => slot.id === slotId)
}
