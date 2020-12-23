import React from "react";

const hamburger = props => {
    const classes = ['hamburger']
    props.classes && props.classes.forEach(cls => classes.push(cls))
    return (
        <div onClick={props.click} className={classes.join(' ')}>
            <div className="hamburger__inner"></div>
        </div>
    );
};

export default hamburger;
