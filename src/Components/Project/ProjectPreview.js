import React from "react";
import { connect } from "react-redux";

import Progress from "../Project/Progress";
import { objectStatus } from "../../shared/strings";
import { objectsToArray, formatDate } from "../../shared/utility";

const parseDescription = (desc) => {
    // Add ellipsis to the string if greater than 100 characters
    if (!desc) return false;
    if (desc.length > 100) {
        return desc.split(" ", 14).join(" ") + "...";
    }
    return desc;
};

export const ProjectPreview = (props) => {
    const completeTasks = props.tasks.filter(
        (t) => t.status === objectStatus.completed
    );
    const totalTasks = props.tasks.filter(
        (t) => t.status !== objectStatus.archived
    );
    return (
        <>
            <div className="project card" onClick={props.onClick}>
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
                        {props.dueDate && (
                            <div className="project__info__item project__info__item--end">
                                {formatDate(props.dueDate)}
                            </div>
                        )}
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

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: objectsToArray(state.tasks.tasks).filter(
            (t) => t.projectId === ownProps.id
        ),
    };
};

export default connect(mapStateToProps)(ProjectPreview);
