import React from "react";
import { connect } from "react-redux";

import Progress from "../Project/Progress";
import {objectStatus} from "../../shared/strings"

const parseDescription = desc => {
    // Add ellipsis to the string if greater than 100 characters
    if (!desc) return false;
    if (desc.length > 100) {
        return desc.split(" ", 14).join(" ") + "...";
    }
    return desc;
};

const projectPreview = props => {
    const completeTasks = Object.values(props.tasks).filter(value => value.status === objectStatus.completed)
    const totalTasks = Object.values(props.tasks).filter(value => value.status !== objectStatus.archived)
    return (
        <>
            <div className="project card">
                <div className="card__wrap">
                    <div className="project__head">
                        <div className="project__head__title heading">
                            {props.heading}
                        </div>
                    </div>

                    <p className="project__desc">
                        {parseDescription(props.description)}
                    </p>
                    <div className="project__info">
                        <div className="project__labels">
                            <div className="label">Label</div>
                            <div className="label">info</div>
                        </div>
                        <div className="project__date">{props.dueDate}</div>
                    </div>
                </div>
                {totalTasks.length ? (
                    <Progress
                        complete={completeTasks ? completeTasks.length : 0}
                        total={totalTasks.length}
                    />
                ) : null}
            </div>
        </>
    );
};

const getProjectTasks = (tasks, projectId) => {
    let sortedTasks = {};
    for (const [key, value] of Object.entries(tasks)) {
        if (value.projectId === projectId) {
            sortedTasks[key] = value;
        }
    }
    return sortedTasks;
};

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: getProjectTasks(state.tasks.tasks, ownProps.id)
    };
};

export default connect(mapStateToProps)(projectPreview);
