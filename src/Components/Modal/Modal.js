import React from "react";
import Backdrop from "./Backdrop";

import { CSSTransition } from "react-transition-group";

const modal = (props) => {
    return (
        <>
        {/* <CSSTransition in={props.active} timeout={400} classNames="backdrop-" unmountOnExit> */}
            <Backdrop
                close={props.toggle}
                theme={props.theme}
                active={props.active}
            />
        {/* </CSSTransition> */}
        <CSSTransition in={props.active} timeout={400} classNames="modal-" unmountOnExit>
            <div className="modal">
                <div className="card__wrap">
                    <div onClick={props.toggle} className="modal__close">
                        &times;
                    </div>
                    {props.children}
                </div>
            </div>
        </CSSTransition>
        </>
    );
};

export default modal;
