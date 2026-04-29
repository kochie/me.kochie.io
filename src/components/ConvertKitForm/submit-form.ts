'use server'

import { z } from 'zod'

const API_KEY = process.env.CONVERTKIT_API_KEY
const BASE_URL = 'https://api.convertkit.com/v3'

const schema = z.object({
  email: z.string({ error: 'Invalid Email' }).email(),
  first_name: z.string({ error: 'Invalid Name' }).optional(),
})

export interface SubscribeState {
  status: 'INITIAL' | 'SUCCESS' | 'ERROR'
  errors?: string
}

export async function subscribeToForm(
  formId: string,
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const url = `${BASE_URL}/forms/${formId}/subscribe`

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

  try {
    await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: JSON.stringify({
        api_key: API_KEY,
        email: validatedFields.data.email,
        first_name: validatedFields.data.first_name,
      }),
    })
  } catch (error) {
    return {
      status: 'ERROR',
      errors: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  return { status: 'SUCCESS' }
}
