import React from "react";
import Backdrop from "./Backdrop";

const modal = props => {
    const modalClasses = ["modal"];
    props.open && modalClasses.push("modal--active");
    return (
        <>
            <Backdrop close={props.close} active={props.active} style={props.style} />
            <div className={modalClasses.join(" ")}>
                <div className="container container--box">
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
