'use server'

import { z } from 'zod'

const API_KEY = process.env.BEEHIIV_API_KEY
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID
const BASE_URL = 'https://api.beehiiv.com/v2'

const schema = z.object({
  email: z.string({ error: 'Invalid Email' }).email(),
  first_name: z.string({ error: 'Invalid Name' }).optional(),
})

export interface SubscribeState {
  status: 'INITIAL' | 'SUCCESS' | 'ERROR'
  errors?: string
}

interface BeehiivErrorResponse {
  errors?: Array<{ message?: string; status?: number }>
}

export async function subscribeToNewsletter(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  if (!API_KEY || !PUBLICATION_ID) {
    return {
      status: 'ERROR',
      errors:
        'Newsletter is not configured. Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID.',
    }
  }

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    first_name: formData.get('first_name'),
  })

  if (!validatedFields.success) {
    const fieldErrors = z.flattenError(validatedFields.error).fieldErrors
    const messages = Object.values(fieldErrors).flat().filter(Boolean)
    return {
      status: 'ERROR',
      errors: messages.join(', ') || 'Invalid input',
    }
  }

  const { email, first_name } = validatedFields.data

  try {
    const res = await fetch(
      `${BASE_URL}/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'me.kochie.io',
          referring_site: 'https://me.kochie.io',
          ...(first_name
            ? {
                custom_fields: [{ name: 'First Name', value: first_name }],
              }
            : {}),
        }),
      }
    )

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as
        | BeehiivErrorResponse
        | null
      const message =
        body?.errors?.[0]?.message ?? `Subscription failed (${res.status})`
      return { status: 'ERROR', errors: message }
    }
  } catch (error) {
    return {
      status: 'ERROR',
      errors: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  return { status: 'SUCCESS' }
}
