import React from 'react'

import Hamburger from './Hamburger'

const topnav = (props) => {

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__head heading">{props.heading}</div>
                <Hamburger open="false" />
            </div>
        </nav>
    )
}

export default topnav