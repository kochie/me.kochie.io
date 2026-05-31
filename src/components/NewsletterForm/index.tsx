'use client'

import { useActionState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSync, faArrowRight } from '@fortawesome/pro-duotone-svg-icons'
import {
  subscribeToNewsletter,
  type SubscribeState,
} from './submit-form'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'

const NewsletterForm = () => {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(
    subscribeToNewsletter,
    { status: 'INITIAL' }
  )

  return (
    <div>
      <SectionHeader
        number="03"
        department="Dispatch"
        title="Sporadic notes, sent occasionally."
        note="Opt-in only — unsubscribe at any time. Powered by Beehiiv."
      />

      <form
        className="flex flex-col gap-3 max-w-2xl"
        action={formAction}
        id="newsletter-embed"
      >
        <label
          htmlFor="member_first_name"
          className="text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground"
        >
          Your name{' '}
          <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <div className="flex items-stretch border-b border-foreground focus-within:border-wheat transition-colors">
          <input
            type="text"
            name="first_name"
            id="member_first_name"
            aria-label="Your name"
            placeholder="Neil Armstrong"
            autoComplete="given-name"
            disabled={pending || state.status === 'SUCCESS'}
            className="flex-1 bg-transparent py-3 pr-3 outline-none text-base lg:text-lg placeholder:text-muted-foreground/60"
          />
        </div>

        <label
          htmlFor="member_email"
          className="mt-3 text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground"
        >
          Your email address
        </label>
        <div className="flex items-stretch border-b border-foreground focus-within:border-wheat transition-colors">
          <input
            type="email"
            name="email"
            id="member_email"
            aria-label="Your email address"
            placeholder="neil@armstrong.moon"
            autoComplete="email"
            required
            disabled={pending || state.status === 'SUCCESS'}
            className="flex-1 bg-transparent py-3 pr-3 outline-none text-base lg:text-lg placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={pending || state.status === 'SUCCESS'}
            aria-label="Subscribe"
            className="px-3 py-3 cursor-pointer disabled:cursor-not-allowed text-foreground hover:text-wheat transition-colors"
          >
            {pending ? (
              <FontAwesomeIcon icon={faSync} spin />
            ) : state.status === 'SUCCESS' ? (
              <FontAwesomeIcon icon={faCheck} className="text-wheat" />
            ) : (
              <FontAwesomeIcon icon={faArrowRight} />
            )}
          </button>
        </div>

        {state.errors && (
          <div
            key={state.errors}
            role="alert"
            className="motion-safe:animate-[fade-in-down_240ms_ease-out] text-sm text-red-700 dark:text-red-300"
          >
            {state.errors}
          </div>
        )}

        {state.status === 'SUCCESS' && (
          <div
            key="success"
            role="status"
            className="motion-safe:animate-[fade-in-down_240ms_ease-out] text-sm font-mono uppercase tracking-[0.18em] text-wheat"
          >
            Subscribed — see you in the inbox.
          </div>
        )}
      </form>
    </div>
  )
}

export default NewsletterForm
