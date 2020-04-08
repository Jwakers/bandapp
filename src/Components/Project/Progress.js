import React from "react";

const progress = props => {
    const classes = ["progress"];
    props.seperate && classes.push("progress--seperate");
    return (
        <div
            className={classes.join(" ")}
            value={props.complete}
            max={props.total}
        >
            <div
                className="progress__bar"
                style={{
                    width: `${(props.complete / props.total) * 100}%`
                }}
            ></div>
            <div className="progress__container">
                <div className="progress__info">
                    <strong>{props.complete}</strong> of{" "}
                    <strong>{props.total}</strong> subtasks complete
                </div>
                <div className="progress__update">Update status</div>
            </div>
        </div>
    );
};

export default progress;
