import React from "react";

const thumbnav = (props) => {
    return (
        <div className="thumbnav">
            <div className="thumbnav__item" onClick={props.newProjectOpen}>
                <div className="thumbnav__item__icon">
                    <i className="material-icons md-36">
                        library_add
                    </i>
                </div>
            </div>
            <div className="thumbnav__item">
                <div className="thumbnav__item__icon">
                    <i className="material-icons md-36" onClick={props.toggle}>
                        menu
                    </i>
                </div>
            </div>
        </div>
    );
};

export default thumbnav;
