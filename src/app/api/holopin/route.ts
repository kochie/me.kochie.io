import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // console.log(searchParams.get('username'))
  const data = await fetch(
    `https://www.holopin.io/api/auth/user/page?username=${searchParams.get(
      'username'
    )}`
  ).then((res) => res.json())
  // console.log(data)

  return NextResponse.json({ ...data })
}
