'use client'

import { useActionState, useState } from 'react'
import { Logo } from './convertkit-logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSync } from '@fortawesome/pro-duotone-svg-icons'
import { animated, useTransition } from '@react-spring/web'
import { subscribeToForm } from './submit-form'

const ConvertKitForm = ({ formId }: { formId: string }) => {


  const subscribeToFormWithId = subscribeToForm.bind(null, formId)
  
  const [state, formAction, pending] = useActionState(subscribeToFormWithId, {status: "INITIAL"})

  // Updated transition with bounce effect
  const errorTransitions = useTransition(state.errors, {
    from: { opacity: 0, y: -20 },
    enter: { 
      opacity: 1, 
      y: 0,
      config: {
        mass: 1,
        tension: 280,
        friction: 14,
      }
    },
    leave: { opacity: 0, y: 10 },
  })

  return (
    <div
      id="convertkit-embed"
      className="relative max-w-5xl mx-autotransition-all transform duration-500 group rounded-xl dark:bg-gray-700 bg-gray-300 shadow-lg"
    >
        <div className="p-4 md:p-8 lg:p-10 flex flex-col lg:flex-row">
          <form className="w-full" action={formAction}>
            <div className="mb-5 items-center">
              <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Like what you see?</h1>
              <h2 className="text-gray-700 my-1 leading-relaxed dark:text-gray-300">
                Find out when I sporadically scream into the void...
              </h2>
            </div>

            <div className="grid grid-cols-8 gap-x-3 gap-y-6 w-full">
              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="member_email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="text-black px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:text-white dark:bg-stone-900"
                  name="email"
                  id="member_email"
                  aria-label="Your email address"
                  placeholder="tony@stark.industries"
                  required
                  // onChange={}
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="member_first_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Name <span className="italic text-gray-400">(Optional)</span>
                </label>
                <input
                  className="text-black px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:text-white dark:bg-stone-900"
                  placeholder="Tony"
                  type="text"
                  name="first_name"
                  id="member_first_name"
                />
              </div>

              {errorTransitions((style, item) => (
                // @ts-expect-error - ts error for style
                <animated.div className="col-span-8" style={style}>
                  <div>
                    <span className="text-sm mb-1">
                      Whoops... There&apos;s been some issues submitting this
                      form -{' '}
                    </span>
                    <span className="list-none text-sm dark:text-red-400 text-red-600 font-bold">
                      {item}
                    </span>
                  </div>
                </animated.div>
              ))}

              <div className="col-span-8 md:col-span-2 text-sm">
                <button
                  type="submit"
                  disabled={pending}
                  className={`w-full p-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500 disabled:cursor-not-allowed text-white font-bold rounded transform duration-200 cursor-pointer`}
                >
                  {pending ? (
                    <div className='flex justify-center items-center'>
                      <FontAwesomeIcon icon={faSync} className="" spin size="lg"/>
                    </div>
                  ) : (
                    state.status === 'INITIAL' ? 'Subscribe' : 
                    state.status === 'SUCCESS' ? (
                      <div className="duration-100 transform flex justify-center gap-2 items-center">
                        <FontAwesomeIcon icon={faCheck} className="" size='lg' />
                        <span>Subscribed</span>
                      </div>
                    ) : 
                    state.status === 'ERROR' ? 'Try Again' : null
                  )}
                  
                </button>
              </div>
              <div className="col-span-4 md:place-self-center self-center">
                <p className="md:mt-2 ml-1 md:text-center text-sm">
                  Privacy respected. Unsubscribe at anytime.
                </p>
              </div>
              <div
                className="col-span-2 md:col-span-2 place-self-end self-center"
                title="Powered by ConvertKit"
              >
                {Logo}
              </div>
            </div>
          </form>
      </div>
    </div>
  )
}

export default ConvertKitForm
