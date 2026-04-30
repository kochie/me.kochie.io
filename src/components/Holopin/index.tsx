import { HolopinBoard } from './HolopinBoard'
import type { HolopinResponse } from './types'

export interface HolopinProps {
  username: string
}

export async function fetchHolopin(
  username: string
): Promise<HolopinResponse | null> {
  try {
    const res = await fetch(
      `https://www.holopin.io/api/auth/user/page?username=${encodeURIComponent(username)}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = (await res.json()) as HolopinResponse
    if (!data?.page?.positions) return null
    return data
  } catch {
    return null
  }
}

export default async function Holopin({ username }: HolopinProps) {
  const data = await fetchHolopin(username)
  if (!data) return null

  return <HolopinBoard username={username} data={data} />
}

export function HolopinSkeleton() {
  return (
    <div className="h-[380px]">
      <div className="relative overflow-hidden w-full h-full rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
    </div>
  )
}
