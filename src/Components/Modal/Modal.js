import React from "react";
import Backdrop from "./Backdrop";

import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
    let nodeRef = React.useRef(null);

    return (
        <>
            <Backdrop
                close={props.toggle}
                theme={props.theme}
                active={props.active}
            />
            <CSSTransition
                in={props.active}
                timeout={400}
                classNames="modal-"
                nodeRef={nodeRef}
                unmountOnExit
            >
                <div className="modal" ref={nodeRef}>
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

export default Modal;
