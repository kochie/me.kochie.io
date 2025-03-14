'use server'

const API_KEY = process.env.CONVERTKIT_API_KEY
const BASE_URL = 'https://api.convertkit.com/v3'

import { z } from 'zod'

const schema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .email(),
  first_name: z
    .string({
      invalid_type_error: 'Invalid Name',
    })
    .optional(),
})

export async function subscribeToForm(
  formId: string,
  _prevState: { status: string; errors: string },
  formData: FormData
) {
  console.log(formId, _prevState, formData)
  const url = `${BASE_URL}/forms/${formId}/subscribe`

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    first_name: formData.get('first_name'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      status: 'ERROR',
      errors: validatedFields.error.flatten().fieldErrors,
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
      errors: error.message,
    }
  }

  return { status: 'SUCCESS' }
}
