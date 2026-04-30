'use client'

import Image from 'next/image'
import { useSyncExternalStore } from 'react'

// Static imports give next/image the dimensions + blurDataURL it needs
// for proper optimisation and placeholder rendering at any aspect ratio.
import a01 from '@/images/avatars/0A964326-3AF2-43E9-8FE7-A5116948C2CE_1_105_c.jpeg'
import a02 from '@/images/avatars/16DA6715-F7CB-4A32-87D2-8EE90AA2943C_1_105_c.jpeg'
import a03 from '@/images/avatars/25D11D47-8F85-4B53-A35C-0C3482F7AA90_1_105_c.jpeg'
import a04 from '@/images/avatars/2F692B41-B667-4F6F-B809-C1160C38B9FE_1_201_a.jpeg'
import a05 from '@/images/avatars/50A898DD-E2D3-4CDC-B156-A193FE928808_1_105_c.jpeg'
import a06 from '@/images/avatars/5D4F0C4E-E84A-4DA1-A72F-A93EFDF6DF48_1_105_c.jpeg'
import a07 from '@/images/avatars/A6BB359E-795E-407D-8A15-D40E9E7A87A6_4_5005_c.jpeg'
import a08 from '@/images/avatars/AB2D6CC1-BE56-45E2-A6F1-E9BDF0E7B942_4_5005_c.jpeg'
import a09 from '@/images/avatars/C8703A18-E30E-4D3B-87F8-E3198914E7A5_1_105_c.jpeg'
import a10 from '@/images/avatars/CB15B2A1-B9BF-49DE-ADAF-88AA6ED84FF1_1_105_c.jpeg'
import a11 from '@/images/avatars/E7921F12-8D55-4DC8-ABD1-C1ABC58FF4FC_1_105_c.jpeg'
import a12 from '@/images/avatars/F2C9466D-9B91-4A03-B793-781DD0EE5358_4_5005_c.jpeg'

const AVATARS = [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12]

// useSyncExternalStore is the canonical way to render "X on the server,
// Y on the client" without a hydration warning. The random index is picked
// once per page load and cached at module level, so the snapshot getter
// stays referentially stable (and React doesn't re-call render endlessly).
const subscribe = () => () => {}
let cachedIndex: number | null = null
const getClientSnapshot = () => {
  if (cachedIndex === null) {
    cachedIndex = Math.floor(Math.random() * AVATARS.length)
  }
  return cachedIndex
}
const getServerSnapshot = () => 0

/**
 * Renders a random avatar from the pool on each page load. Server renders
 * index 0 (deterministic); after hydration the cached random pick takes
 * over and the image swaps in with a soft fade.
 */
export function RandomAvatar() {
  const index = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  return (
    <Image
      key={index}
      src={AVATARS[index]}
      alt="Robert Koch"
      placeholder="blur"
      fill
      sizes="160px"
      priority
      className="object-cover transform-gpu transition duration-700 hover:scale-110 motion-safe:animate-[fade-in-down_400ms_ease-out]"
    />
  )
}
