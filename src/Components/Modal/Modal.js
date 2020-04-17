import React from "react";
import Backdrop from "./Backdrop";

const modal = props => {
    const modalClasses = ["modal", 'card'];
    props.active && modalClasses.push("modal--active");
    return (
        <>
            <Backdrop toggle={props.toggle} active={props.active} theme={props.theme} />
            <div className={modalClasses.join(" ")}>
                <div className="card__wrap">
                    <div onClick={props.toggle} className="modal__close">
                        &times;
                    </div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default modal;
