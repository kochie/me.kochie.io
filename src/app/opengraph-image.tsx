import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt =
  'Robert Koch — I build things, write the code for them, & run from the resulting explosion.'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

const PAPER = '#faf6ec'
const INK = '#171311'
const WHEAT = '#d9b67a'

export default async function OpengraphImage() {
  const [fraunces, mono] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/Fraunces-Italic.woff')),
    readFile(join(process.cwd(), 'src/app/JetBrainsMono-Medium.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          color: INK,
          padding: '41px 84px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 17,
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              background: INK,
              opacity: 0.55,
            }}
          />
          <span>Robert Koch · Melbourne</span>
        </div>

        {/* Hook */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Fraunces',
            fontStyle: 'italic',
            fontSize: 92,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          <span>I build things,</span>
          <span>write the code for them,</span>
          <span>{'& run from the'}</span>
          <span style={{ color: WHEAT }}>resulting explosion.</span>
        </div>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.78,
          }}
        >
          <span>Engineer · Speaker · Guitarist</span>
          <span>me.kochie.io</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Fraunces',
          data: fraunces,
          style: 'italic',
          weight: 400,
        },
        {
          name: 'JetBrains Mono',
          data: mono,
          style: 'normal',
          weight: 500,
        },
      ],
    },
  )
}
