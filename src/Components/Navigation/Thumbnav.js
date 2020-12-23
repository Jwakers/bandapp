import React from 'react'
import Hamburger from './Hamburger';
import addIcon from '../../assets/icons/add.svg'

const thumbnav = props => {
    return (
        <div className="thumbnav">
            <div className="thumbnav__item" onClick={props.newProjectOpen}>
                <img className="thumbnav__item__icon" src={addIcon} alt="Addition icon" />
            </div>
            <div className="thumbnav__item">
                <Hamburger open="false" classes={["thumbnav__item__icon"]} click={props.toggle} />
            </div>
        </div>
    )
}

export default thumbnav