import React from "react";

const placeholder = (props) => {
    let additionalMessage = "";
    if (props.icon) {
        additionalMessage = (
            <div>
                Click{" "}
                {props.icon}
                to get started!
            </div>
        );
    }
    if (props.altMessage) {
        additionalMessage = props.altMessage;
    }
    let classes = ["placeholder-message"];
    if (props.modifier) classes.push(props.modifier);
    return (
        <div className={classes.join(" ")}>
            <h1 className="heading heading--h1">{props.heading}</h1>
            {additionalMessage}
        </div>
    );
};

export default placeholder;
