import Image from "next/image";
import Link from 'next/link'
import React, { forwardRef } from 'react'
import Holopin from '../Holopin'

const placeholder =
  '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'

const Img = (props, ref) => (
  <div ref={ref}>
    <Image
      className="rounded-xl cursor-pointer"
      src="https://holopin.io/api/user/board?user=kochie"
      alt="@kochie's Holopin board"
      width={2428}
      height={764}
      placeholder="blur"
      blurDataURL={`data:image/png;base64,${placeholder}`}
      style={{
        maxWidth: "100%",
        height: "auto"
      }} />
  </div>
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
      <Holopin username="kochie" />
    </div>
  </div>
)

export default Awards
