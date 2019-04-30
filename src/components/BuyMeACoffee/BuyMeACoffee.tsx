import * as React from 'react'

import './BuyMeACoffee.css'

interface Props {
  username: String
}

const coffee = "https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"

const BuyMeACoffee: React.SFC<Props> = ({username}) => {
  return (
    <div className="bmc-button-container">
      <a className="bmc-button" target="_blank" href={`https://www.buymeacoffee.com/${username}`}>
        <img src={coffee} alt="Buy me a coffee" />
        <span className="bmc-span">Buy me a coffee</span>
      </a>
    </div>
  )
}

export default BuyMeACoffee