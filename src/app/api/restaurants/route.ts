import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const outcode = searchParams.get('outcode')

  if (!outcode) {
    return NextResponse.json({ error: 'Outcode is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://uk.api.just-eat.io/restaurants/bypostcode/${outcode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-GB',
          'User-Agent': 'Mozilla/5.0',
          'Origin': 'https://www.just-eat.co.uk',
          'Referer': 'https://www.just-eat.co.uk/',
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}
