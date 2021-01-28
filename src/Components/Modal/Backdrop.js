import React from "react";
import { CSSTransition } from 'react-transition-group';

const backdrop = props => {
    const classes = ["backdrop", `backdrop--${props.theme ? props.theme : 'dark' }`];
    // props.active && classes.push("backdrop--active");
    return (
        <CSSTransition in={props.active} timeout={400} classNames="backdrop-" unmountOnExit>
            <div onClick={props.close} className={classes.join(" ")}></div>
        </CSSTransition>
    );
};

export default backdrop;
