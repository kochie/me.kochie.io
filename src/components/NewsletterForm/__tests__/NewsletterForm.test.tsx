import { render } from '@testing-library/react'
import NewsletterForm from '..'

describe('NEWSLETTERFORM COMPONENT', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<NewsletterForm />)
    expect(asFragment()).toMatchSnapshot()
  })
})
