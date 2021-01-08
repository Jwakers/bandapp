import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import { objectStatus } from "../../shared/strings";

const Task = (props) => {
    const taskRef = createRef();

    const position = {
        down: null,
        move: null,
        up: null,
    };
    const icons = {
        delete: null,
        complete: null,
    };

    useEffect(() => {
        taskRef.current.classList.add("task--set");
    });

    const down = (event) => {
        position.down = event.touches[0].clientX;
        event.currentTarget.addEventListener("touchmove", move, false);
        event.currentTarget.classList.add("task--sliding");

        icons.complete = event.currentTarget.parentElement.querySelector(
            ".task__icon--complete"
        );
        icons.delete = event.currentTarget.parentElement.querySelector(
            ".task__icon--delete"
        );
    };
    const move = (event) => {
        position.move = position.down - event.touches[0].clientX;
        event.currentTarget.style.transform = `translateX(${-position.move}px)`;
        if (position.move < -150) {
            icons.complete.classList.add("task__icon--active");
        } else {
            icons.complete.classList.remove("task__icon--active");
        }
        if (position.move > 150) {
            icons.delete.classList.add("task__icon--active");
        } else {
            icons.delete.classList.remove("task__icon--active");
        }
    };
    const leave = (event) => {
        event.currentTarget.classList.remove("task--sliding");

        if (position.move < -150) {
            // Complete todo
            complete(event.currentTarget);
        } else if (position.move > 150) {
            // Delete todo
            deleteEl(event.currentTarget);
        } else {
            // Return to position
            event.currentTarget.style.transform = null;
        }

        event.currentTarget.removeEventListener("touchmove", move);
    };

    const complete = (element) => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        icons.complete.classList.remove("task__icon--active");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-right");
                element.addEventListener("transitionend", () => {
                    props.updateTask(props.task.locationId, props.taskId, {
                        status: objectStatus.completed,
                    });
                });
            });
        });
    };

    const deleteEl = (el) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            props.deleteTask(props.task.locationId, props.taskId)
        } else {
            el.style.transform = null;
        }
    };

    const resetTransition = (element) => (element.style.transform = null);

    const classes = ["task", "card"];
    switch (props.task.status) {
        case objectStatus.completed:
            classes.push("task--complete");
            break;
        case objectStatus.archived:
            classes.push("task--deleted");
            break;
        default:
    }
    return (
        <>
            <div className="task__container">
                <div
                    className={classes.join(" ")}
                    onTouchStart={
                        props.task.status === objectStatus.pending
                            ? down
                            : undefined
                    }
                    onTouchEnd={
                        props.task.status === objectStatus.pending
                            ? leave
                            : undefined
                    }
                    onClick={props.onClick.bind(this, {
                        ...props.task,
                        id: props.taskId,
                    })}
                    ref={taskRef}
                >
                    <div className="task__wrap card__wrap">
                        <div className="task__content">
                            <div className="task__title">
                                {props.task.heading}
                            </div>
                            <div className="task__description">
                                {props.task.description}
                            </div>
                        </div>
                        <div className="task__assignee">[assignee]</div>
                    </div>
                </div>
                <i className="material-icons task__icon task__icon--complete">done</i>
                <i className="material-icons task__icon task__icon--delete">delete</i>
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        task: state.tasks.tasks[ownProps.taskId],
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (projectId, taskId, taskData) =>
            dispatch(actions.updateTask(projectId, taskId, taskData)),
        deleteTask: (projectId, taskId) => {
            dispatch(actions.deleteTask(projectId, taskId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
