import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import completeIcon from "../../assets/icons/complete.svg";
import deleteIcon from "../../assets/icons/delete.svg";
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
            // return to position
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

    const deleteEl = (element) => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        icons.delete.classList.remove("task__icon--active");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-left");

                element.addEventListener("transitionend", () => {
                    props.updateTask(props.task.locationId, props.taskId, {
                        status: objectStatus.archived,
                    });
                });
            });
        });
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
                    onClick={props.clicked.bind(this, {
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
                <img
                    className="task__icon task__icon--complete"
                    src={completeIcon}
                    alt=""
                />
                <img
                    className="task__icon task__icon--delete"
                    src={deleteIcon}
                    alt=""
                />
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
        updateTask: (taskId, userId, taskData) =>
            dispatch(actions.updateTask(taskId, userId, taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
