import React from "react";

const project = props => (
    <div class="project">
        <div class="project__container">
            <div class="project__head">
                <div class="project__head__title">{props.heading}</div>
                <div class="project__head__assignees">[assignees]</div>
            </div>

            <p class="project__desc">{props.description}</p>
            <div class="project__info">
                <div class="project__labels">
                    <div class="label">Label</div>
                    <div class="label">info</div>
                </div>
                <div class="project__date">{props.dueDate}</div>
            </div>
        </div>
        <div
            class="project__progress"
            value={props.subtasks.complete}
            max={props.subtasks.total}
        >
            <div
                class="project__progress__bar"
                style={{
                    width:
                        `${(props.subtasks.complete / props.subtasks.total) * 100}%`
                }}
            ></div>
            <div class="project__progress__container">
                <div class="project__progress__info">
                    <strong>{props.subtasks.complete}</strong> of{" "}
                    <strong>{props.subtasks.total}</strong> subtasks complete
                </div>
                <div class="project__progress__update">Update status</div>
            </div>
        </div>
    </div>
);

export default project;
