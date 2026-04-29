import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const data = await fetch(
    `https://www.holopin.io/api/auth/user/page?username=${searchParams.get(
      'username'
    )}`
  ).then((res) => res.json())

  return NextResponse.json({ ...data })
}
