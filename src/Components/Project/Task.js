import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Modal from "../Modal/Modal";
import UpdateTaskForm from "../Form/UpdateTaskForm";

import { objectStatus } from "../../shared/strings";
import { formatDate } from "../../shared/utility";

const Task = (props) => {
    const taskRef = createRef();
    const [updateForm, setUpdateForm] = useState(false);
    const [addToIncomplete, setAddToIncomplete] = useState(false);

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

    const toggleUpdateForm = () => {
        setUpdateForm((prev) => !prev);
    };

    const toggleAddToIncomplete = () => {
        setAddToIncomplete((prev) => !prev);
    };

    const handleUpdateTask = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["dueDate"].value,
        };
        const task = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
        };
        props.updateTask(props.task.locationId, props.taskId, task);
        setUpdateForm(false);
    };

    const handleAddTaskToIncomplete = () => {
        props.updateTask(props.task.locationId, props.taskId, {
            status: objectStatus.pending,
        });
        setAddToIncomplete(false);
    };

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
        if (window.confirm("Are you sure you want to delete this task?")) {
            props.deleteTask(props.task.locationId, props.taskId);
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
                    onClick={
                        props.task.status === objectStatus.pending
                            ? toggleUpdateForm
                            : toggleAddToIncomplete
                    }
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
                        <div className="task__date">
                            {props.task.dueDate &&
                                props.task.status !== objectStatus.completed &&
                                formatDate(props.task.dueDate, false)}
                        </div>
                    </div>
                </div>
                <i className="material-icons task__icon task__icon--complete">
                    done
                </i>
                <i className="material-icons task__icon task__icon--delete">
                    delete
                </i>
            </div>
            <Modal toggle={toggleUpdateForm} active={updateForm}>
                <div className="heading">{"Edit task"}</div>
                <UpdateTaskForm
                    onSubmit={handleUpdateTask}
                    task={props.task}
                    close={toggleUpdateForm}
                />
            </Modal>
            <Modal toggle={toggleAddToIncomplete} active={addToIncomplete}>
                <>
                    <p>
                        Add <strong>{props.task.heading}</strong> back to
                        incomplete tasks?
                    </p>
                    <div className="form__control">
                        <button
                            className="button-subtle button-subtle--warning"
                            onClick={toggleAddToIncomplete}
                        >
                            Cancel
                        </button>
                        <button
                            className="button button--continue"
                            onClick={handleAddTaskToIncomplete}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            </Modal>
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
            dispatch(actions.deleteTask(projectId, taskId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
