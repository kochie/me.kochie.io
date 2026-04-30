'use client'

import Image from 'next/image'
import { useSyncExternalStore } from 'react'

// Static imports give next/image the dimensions + blurDataURL it needs
// for proper optimisation and placeholder rendering at any aspect ratio.
import a01 from '@/images/avatars/0A964326-3AF2-43E9-8FE7-A5116948C2CE_1_105_c.jpeg'
import a02 from '@/images/avatars/25D11D47-8F85-4B53-A35C-0C3482F7AA90_1_105_c.jpeg'
import a03 from '@/images/avatars/2F692B41-B667-4F6F-B809-C1160C38B9FE_1_201_a.jpeg'
import a04 from '@/images/avatars/5D4F0C4E-E84A-4DA1-A72F-A93EFDF6DF48_1_105_c.jpeg'
import a05 from '@/images/avatars/7B68C46E-6765-4101-8ECA-065BE7A42107.png'
import a06 from '@/images/avatars/A6BB359E-795E-407D-8A15-D40E9E7A87A6_4_5005_c.jpeg'
import a07 from '@/images/avatars/AB2D6CC1-BE56-45E2-A6F1-E9BDF0E7B942_4_5005_c.jpeg'
import a08 from '@/images/avatars/C8703A18-E30E-4D3B-87F8-E3198914E7A5_1_105_c.jpeg'
import a09 from '@/images/avatars/CB15B2A1-B9BF-49DE-ADAF-88AA6ED84FF1_1_105_c.jpeg'
import a10 from '@/images/avatars/E547FCDC-EDDF-4A91-923F-64B41EAE7C28_1_105_c.png'
import a11 from '@/images/avatars/E7921F12-8D55-4DC8-ABD1-C1ABC58FF4FC_1_105_c.jpeg'
import a12 from '@/images/avatars/F2C9466D-9B91-4A03-B793-781DD0EE5358_4_5005_c.jpeg'

const AVATARS = [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12]

// Module-level external store. The cached index drives both initial load
// and the click-to-shuffle behaviour. useSyncExternalStore handles the
// SSR/CSR snapshot mismatch and the post-click re-render notification.
const listeners = new Set<() => void>()
let cachedIndex: number | null = null

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getClientSnapshot = () => {
  if (cachedIndex === null) {
    cachedIndex = Math.floor(Math.random() * AVATARS.length)
  }
  return cachedIndex
}

const getServerSnapshot = () => 0

// Modulo trick: pick an offset in [1, AVATARS.length - 1] so the next
// index is guaranteed different from the current one — no while-loop, no
// chance of "random" picking the same photo twice in a row.
const shuffle = () => {
  if (AVATARS.length <= 1) return
  const current = cachedIndex ?? 0
  const offset = 1 + Math.floor(Math.random() * (AVATARS.length - 1))
  cachedIndex = (current + offset) % AVATARS.length
  listeners.forEach((l) => l())
}

/**
 * Random avatar that re-rolls on click. Server renders index 0 so SSR and
 * hydration match; the client picks a fresh random on first read and on
 * every subsequent click. The {@code key} on the Image forces a remount,
 * replaying the fade-in animation as visual feedback.
 */
export function RandomAvatar() {
  const index = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  return (
    <button
      type="button"
      onClick={shuffle}
      aria-label="Show another photo"
      title="Click for another photo"
      className="group relative block w-32 h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden ring-2 ring-cream/30 ring-offset-2 ring-offset-coal/40 shadow-2xl cursor-pointer transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-wheat focus-visible:ring-offset-wheat/20"
    >
      <Image
        key={index}
        src={AVATARS[index]}
        alt="Robert Koch"
        placeholder="blur"
        fill
        sizes="160px"
        priority
        className="object-cover transform-gpu transition duration-700 group-hover:scale-110 motion-safe:animate-[fade-in-down_400ms_ease-out]"
      />
    </button>
  )
}
