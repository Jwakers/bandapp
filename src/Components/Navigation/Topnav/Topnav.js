import React from 'react'

const topnav = (props) => {

    return (
        <nav className="nav">
            <div className="nav__head">{props.heading}</div>
            <div className="nav__menu">Menu</div>
        </nav>
    )
}

export default topnav