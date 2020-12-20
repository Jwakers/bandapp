import React, { createRef, Component } from "react";
import { connect } from "react-redux";

import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import * as actions from "../../store/actions/index";

import completeIcon from "../../assets/icons/complete.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import {objectStatus} from "../../shared/strings"

class Task extends Component {
    taskRef = createRef();
    position = {
        down: null,
        move: null,
        up: null,
    };
    icons = {
        delete: null,
        complete: null,
    };
    state = {
        changeStatusModal: false,
        updateTask: false,
    };

    componentDidMount() {
        setTimeout(() => {
            this.taskRef.current.classList.add("task--set");
        }, 0);
    }
    handleStatusModalToggle = () => {
        this.setState((prevState) => ({
            changeStatusModal: !prevState.changeStatusModal,
        }));
    };
    handleUpdateModalToggle = () => {
        this.setState((prevState) => ({
            updateTask: !prevState.updateTask,
        }));
    };
    handleTaskUpdateSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
        };
        const task = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
        };
        this.props.updateTask(
            this.props.id,
            task,
            this.props.userId
        );
        this.setState({ updateTask: false });
    };
    down = (event) => {
        this.position.down = event.touches[0].clientX;
        event.currentTarget.addEventListener("touchmove", this.move, false);
        event.currentTarget.classList.add("task--sliding");

        this.icons.complete = event.currentTarget.parentElement.querySelector(
            ".task__icon--complete"
        );
        this.icons.delete = event.currentTarget.parentElement.querySelector(
            ".task__icon--delete"
        );
    };
    move = (event) => {
        this.position.move = this.position.down - event.touches[0].clientX;
        event.currentTarget.style.transform = `translateX(${-this.position
            .move}px)`;
        if (this.position.move < -150) {
            this.icons.complete.classList.add("task__icon--active");
        } else {
            this.icons.complete.classList.remove("task__icon--active");
        }
        if (this.position.move > 150) {
            this.icons.delete.classList.add("task__icon--active");
        } else {
            this.icons.delete.classList.remove("task__icon--active");
        }
    };
    leave = (event) => {
        event.currentTarget.classList.remove("task--sliding");

        if (this.position.move < -150) {
            // Complete todo
            this.complete(event.currentTarget);
        } else if (this.position.move > 150) {
            // Delete todo
            this.deleteEl(event.currentTarget);
        } else {
            // return to position
            event.currentTarget.style.transform = null;
        }

        event.currentTarget.removeEventListener("touchmove", this.move);
    };

    complete = (element) => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        this.icons.complete.classList.remove("task__icon--active");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-right");
                element.addEventListener("transitionend", () => {
                    this.props.updateTask(
                        this.props.id,
                        {
                            status: objectStatus.completed,
                        },
                        this.props.userId
                    );
                });
            });
        });
    };
    deleteEl = (element) => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        this.icons.delete.classList.remove("task__icon--active");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-left");

                element.addEventListener("transitionend", () => {
                    this.props.updateTask(
                        this.props.id,
                        { status: objectStatus.archived },
                        this.props.userId
                    );
                });
            });
        });
    };
    resetTransition = (element) => (element.style.transform = null);

    handleTaskStatus = () => {
        this.props.updateTask(
            this.props.id,
            { status: objectStatus.pending },
            this.props.userId
        );
    };

    render() {
        const status = this.props.status;
        const classes = ["task", "card"];
        switch (status) {
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
                            status === objectStatus.pending ? this.down : undefined
                        }
                        onTouchEnd={
                            status === objectStatus.pending ? this.leave : undefined
                        }
                        onClick={
                            status !== objectStatus.pending
                                ? this.handleStatusModalToggle
                                : this.handleUpdateModalToggle
                        }
                        data-id={this.props.id}
                        ref={this.taskRef}
                    >
                        <div className="task__wrap card__wrap">
                            <div className="task__content">
                                <div className="task__title">
                                    {this.props.heading}
                                </div>
                                <div className="task__description">
                                    {this.props.description}
                                </div>
                            </div>
                            <div className="task__assignee">
                                {this.props.assignee}
                            </div>
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
                {status !== objectStatus.pending && (
                    <Modal
                        theme="dark"
                        active={this.state.changeStatusModal}
                        toggle={this.handleStatusModalToggle}
                    >
                        <p>
                            Add <strong>{this.props.heading}</strong> back to
                            incomplete tasks?
                        </p>
                        <div className="form__control">
                            <button
                                className="button-subtle button-subtle--warning"
                                onClick={this.handleStatusModalToggle}
                            >
                                Cancel
                            </button>
                            <button
                                className="button button--continue"
                                onClick={this.handleTaskStatus}
                            >
                                Confirm
                            </button>
                        </div>
                    </Modal>
                )}
                <Modal
                    toggle={this.handleUpdateModalToggle}
                    active={this.state.updateTask}
                >
                    <div className="heading">
                        {"Edit " + this.props.heading}
                    </div>
                    <Form
                        submit={this.handleTaskUpdateSubmit}
                        buttonText="update"
                        inputs={[
                            {
                                title: "Title",
                                value: this.props.heading,
                            },
                            {
                                title: "Description",
                                type: "textarea",
                                value: this.props.description,
                            },
                            {
                                title: "Due date",
                                type: "date",
                                value: this.props.dueDate,
                            },
                        ]}
                    />
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (taskId, status, userId) =>
            dispatch(actions.updateTask(taskId, status, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
