import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

const HolopinImage = ({ user }, ref) => (
  <a ref={ref}>
    <Image
      className="rounded-xl cursor-pointer grayscale-50 hover:grayscale-0 transform-gpu duration-200"
      src={`https://holopin.io/api/user/board?user=${user}`}
      alt={`@${user}'s Holopin board`}
      width={2428}
      height={764}
    />
  </a>
)

const HolopinRef = forwardRef(HolopinImage)

const Holopin = ({ user }) => (
  <div className="w-full">
    <Link href={`https://holopin.io/@${user}`}>
      <HolopinRef user={user} />
    </Link>
  </div>
)

const Awards = () => (
  <div>
    <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-6 mb-4">
      Awards
    </h2>
    <Holopin user="kochie" />
  </div>
)

export default Awards
