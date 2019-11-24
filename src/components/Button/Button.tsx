import React from 'react'

import {button} from "./button.module.css"

export default ({children}) => {
    return (
            <a className={button}>
                {children}
            </a>
    )
}