import { Suspense } from 'react'
import Holopin, { HolopinSkeleton } from '../Holopin'

const Awards = () => (
  <div>
    <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-6 mb-4">
      Awards
    </h2>
    <div className="w-full">
      <Suspense fallback={<HolopinSkeleton />}>
        <Holopin username="kochie" />
      </Suspense>
    </div>
  </div>
)

export default Awards
