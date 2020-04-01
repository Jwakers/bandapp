import React from "react";

const backdrop = props => {
    const classes = ["backdrop"];
    props.active.open && classes.push("backdrop--active");
    return <div onClick={props.close} className={classes.join(" ")}></div>;
};

export default backdrop;
