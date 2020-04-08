import React from "react";
import { connect } from "react-redux";
import { getTasks } from "../../store/actions";

import Progress from "../Project/Progress";

const parseDescription = desc => {
    // Add ellipsis to the string if greater than 100 characters
    if (!desc) return false;
    if (desc.length > 100) {
        return desc.split(" ", 14).join(" ") + "...";
    } else {
        return desc;
    }
};

const projectPreview = props => {
    const completeTasks = props.tasks.filter(t => t.status === "complete")
    return (
        <>
            <div className="project card">
                <div className="card__wrap">
                    <div className="project__head">
                        <div className="project__head__title heading">
                            {props.heading}
                        </div>
                        <div className="project__head__assignees">
                            [assignees]
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
                {props.tasks && (
                    <Progress
                        complete={completeTasks ? completeTasks.length : 0}
                        total={props.tasks.length}
                    />
                )}
            </div>
        </>
    );
};

const getProjectTasks = (tasks, projectId) => {
    return tasks.filter(task => task.projectId === projectId);
};

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: getProjectTasks(state.tasks, ownProps.id)
    };
};

export default connect(mapStateToProps)(projectPreview);
