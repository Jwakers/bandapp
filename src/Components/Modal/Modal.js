import React from "react";
import Backdrop from "./Backdrop";

const modal = props => {
    const modalClasses = ["modal", 'card'];
    props.open && modalClasses.push("modal--active");
    return (
        <>
            <Backdrop close={props.close} active={props.active} theme={props.theme} />
            <div className={modalClasses.join(" ")}>
                <div className="card__wrap">
                    <div onClick={props.close} className="modal__close">
                        &times;
                    </div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default modal;
