import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

const Img = (props, ref) => (
  <Image
    className="rounded-xl cursor-pointer"
    src="https://holopin.io/api/user/board?user=kochie"
    alt="@kochie's Holopin board"
    width={2428}
    height={764}
  />
)

const ImageRef = forwardRef(Img)

const Awards = () => (
  <div>
    <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-6 mb-4">
      Awards
    </h2>
    <div className="w-full">
      <Link href="https://holopin.io/@kochie">
        <ImageRef />
      </Link>
    </div>
  </div>
)

export default Awards
