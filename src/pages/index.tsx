import React, { ReactElement } from 'react'
// import Chat from '@nightborn/signum'

import { Head, App } from '../components'

// const option = {
//   title: 'Hello there !',
//   subTitle: 'How can I help you?',
//   message: 'How can I help you?',
//   name: 'Hello there',
// }

// const config = {
//   openByDefault: false,
//   avatarIcon: "/images/me.jpg",
//   mainColor: 'linear-gradient(90deg, #406321 0%, #283E15 100%)',
//   secondaryColor: 'linear-gradient(90deg, #406321 0%, #283E15 100%)',
//   sendButtonColor: '#0074CE',
//   finalButtonColor: "linear-gradient(90deg, #406321 0%, #283E15 100%)",
//   emailPlaceholder: 'Please fill in your e-mail',
//   messagePlaceholder: 'Please provide us some information',
//   finalTitle: 'Thank you.',
//   finalSubTitle: "We'll be in touch!",
//   finalButtonText: "Continue",
//   // handleFinalButtonClicked: () => { },
//   handleSendClicked: (information): void => console.log(information),
// }

const Index = (): ReactElement => (
  <>
    <Head />
    <App />
    {/* <Chat option={option} config={config} /> */}
  </>
)

export default Index
