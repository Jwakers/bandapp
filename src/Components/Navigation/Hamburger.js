import React from "react";

const hamburger = props => {
    const classes = ['hamburger']
    props.light && classes.push('hamburger--light')
    return (
        <div onClick={props.click} className={classes.join(' ')}>
            <div className="hamburger__inner"></div>
        </div>
    );
};

export default hamburger;
