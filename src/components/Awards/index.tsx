import { Suspense } from 'react'
import { fetchHolopin, HolopinSkeleton } from '../Holopin'
import { HolopinBoard } from '../Holopin/HolopinBoard'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

const HOLOPIN_USERNAME = 'kochie'

const Header = () => (
  <SectionHeader
    number="04"
    department="Recognitions"
    title="Stickers from the internet."
    note="A small board of badges and recognitions, courtesy of Holopin."
  />
)

async function AwardsContent() {
  const data = await fetchHolopin(HOLOPIN_USERNAME)
  if (!data) return null
  return (
    <section className="my-16 lg:my-24">
      <Header />
      <div className="w-full">
        <HolopinBoard username={HOLOPIN_USERNAME} data={data} />
      </div>
    </section>
  )
}

const Awards = () => (
  <Suspense
    fallback={
      <section className="my-16 lg:my-24">
        <Header />
        <div className="w-full">
          <HolopinSkeleton />
        </div>
      </section>
    }
  >
    <AwardsContent />
  </Suspense>
)

export default Awards
