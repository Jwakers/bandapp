import React from "react";
import { CSSTransition } from "react-transition-group";

const Backdrop = (props) => {
    const nodeRef = React.useRef(null);
    const classes = [
        "backdrop",
        `backdrop--${props.theme ? props.theme : "dark"}`,
    ];
    return (
        <CSSTransition
            in={props.active}
            timeout={400}
            classNames="backdrop-"
            nodeRef={nodeRef}
            unmountOnExit
        >
            <div
                onClick={props.close}
                className={classes.join(" ")}
                ref={nodeRef}
            ></div>
        </CSSTransition>
    );
};

export default Backdrop;
