import type { AppleImage } from 'next/dist/lib/metadata/types/extra-types'

interface Device {
  width: number
  height: number
  ratio: 2 | 3
}

// Each device produces 4 entries: portrait/landscape × light/dark.
const DEVICES: Device[] = [
  { width: 1024, height: 1366, ratio: 2 },
  { width: 834, height: 1194, ratio: 2 },
  { width: 768, height: 1024, ratio: 2 },
  { width: 834, height: 1112, ratio: 2 },
  { width: 810, height: 1080, ratio: 2 },
  { width: 430, height: 932, ratio: 3 },
  { width: 393, height: 852, ratio: 3 },
  { width: 428, height: 926, ratio: 3 },
  { width: 390, height: 844, ratio: 3 },
  { width: 375, height: 812, ratio: 3 },
  { width: 414, height: 896, ratio: 3 },
  { width: 414, height: 896, ratio: 2 },
  { width: 414, height: 736, ratio: 3 },
  { width: 375, height: 667, ratio: 2 },
  { width: 320, height: 568, ratio: 2 },
]

const splash = (
  device: Device,
  orientation: 'portrait' | 'landscape',
  scheme: 'light' | 'dark'
): AppleImage => {
  const w = orientation === 'portrait' ? device.width : device.height
  const h = orientation === 'portrait' ? device.height : device.width
  const px = (n: number) => n * device.ratio
  const prefix = scheme === 'dark' ? 'dark-' : ''
  const schemeQuery =
    scheme === 'dark' ? '(prefers-color-scheme: dark) and ' : ''

  return {
    url: `/assets/apple-splash-${prefix}${px(w)}-${px(h)}.jpg`,
    media: `${schemeQuery}(device-width: ${device.width}px) and (device-height: ${device.height}px) and (-webkit-device-pixel-ratio: ${device.ratio}) and (orientation: ${orientation})`,
  }
}

const buildSplashImages = (): AppleImage[] => {
  const orientations: ('portrait' | 'landscape')[] = ['portrait', 'landscape']
  const schemes: ('light' | 'dark')[] = ['light', 'dark']
  return schemes.flatMap((scheme) =>
    DEVICES.flatMap((device) =>
      orientations.map((orientation) => splash(device, orientation, scheme))
    )
  )
}

export const AppleStartupImages: AppleImage[] = buildSplashImages()
