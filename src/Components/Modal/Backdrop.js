import React from "react";

const backdrop = props => {
    const classes = ["backdrop", `backdrop--${props.style}`];
    props.active && classes.push("backdrop--active");
    return <div onClick={props.close} className={classes.join(" ")}></div>;
};

export default backdrop;
