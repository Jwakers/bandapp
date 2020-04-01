import React from 'react'
import addIcon from '../../assets/icons/add.svg'
import musicIcon from '../../assets/icons/music-note.svg'

const thumbnav = props => {
    return (
        <div className="thumbnav">
            <div className="thumbnav__item" onClick={props.newProjectOpen}>
                <img className="thumbnav__item__icon" src={addIcon} />
            </div>
            <div className="thumbnav__item">
                <img className="thumbnav__item__icon" src={musicIcon} type="xml" />
            </div>
        </div>
    )
}

export default thumbnav