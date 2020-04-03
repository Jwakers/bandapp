import React from "react";

const parseDescription = desc => {
    // Add ellipsis to the string if greater than 100 characters
    console.log('[DESC]', desc)
    if (!desc) return false
    if (desc.length > 100) {
        return desc.split(' ', 14).join(' ') + '...';
    } else {
        return desc
    }
}

const projectPreview = props => (
    <div className="project">
        <div className="container container--box">
            <div className="project__head">
                <div className="project__head__title heading">{props.heading}</div>
                <div className="project__head__assignees">[assignees]</div>
            </div>

            <p className="project__desc">{parseDescription(props.description)}</p>
            <div className="project__info">
                <div className="project__labels">
                    <div className="label">Label</div>
                    <div className="label">info</div>
                </div>
                <div className="project__date">{props.dueDate}</div>
            </div>
        </div>
        {props.subtasks &&
        <div
            className="project__progress"
            value={props.subtasks.complete}
            max={props.subtasks.total}
        >
            
            <div
                className="project__progress__bar"
                style={{
                    width:
                        `${(props.subtasks.complete / props.subtasks.total) * 100}%`
                }}
            ></div>
            <div className="project__progress__container">
                <div className="project__progress__info">
                    <strong>{props.subtasks.complete}</strong> of{" "}
                    <strong>{props.subtasks.total}</strong> subtasks complete
                </div>
                <div className="project__progress__update">Update status</div>
            </div>
        </div>}
    </div>
);

export default projectPreview;
