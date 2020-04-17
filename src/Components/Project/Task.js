import React, { createRef } from "react";
import { connect } from "react-redux";

import { updateTaskStatus } from "../../store/actions";
import Modal from "../Modal/Modal";
import { Component } from "react";

class Task extends Component {
    constructor(props) {
        super(props);
        this.taskRef = createRef();
        this.position = {
            down: null,
            move: null,
            up: null,
        };
    }

    state = {
        changeStatusModal: false,
    };

    handleStatusModalToggle = () => {
        this.setState((prevState) => ({
            changeStatusModal: !prevState.changeStatusModal,
        }));
    };

    componentDidMount() {
        setTimeout(() => {
            this.taskRef.current.classList.add("task--set");
        }, 0);
    }

    down = (event) => {
        this.position.down = event.touches[0].clientX;
        event.currentTarget.addEventListener("touchmove", this.move, false);
        event.currentTarget.classList.add("task--sliding");
    };
    move = (event) => {
        this.position.move = this.position.down - event.touches[0].clientX;
        event.currentTarget.style.transform = `translateX(${-this.position
            .move}px)`;
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
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-right");

                element.addEventListener("transitionend", () => {
                    this.props.updateTaskStatus(this.props.id, "complete");
                });
            });
        });
    };
    deleteEl = (element) => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-left");

                element.addEventListener("transitionend", () => {
                    this.props.updateTaskStatus(this.props.id, "deleted");
                });
            });
        });
    };
    resetTransition = (element) => (element.style.transform = null);

    handleTaskStatus = () => {
        this.props.updateTaskStatus(this.props.id, "pending");
    };

    render() {
        const status = this.props.status;
        const classes = ["task", "card"];
        switch (status) {
            case "complete":
                classes.push("task--complete");
                break;
            case "delete":
                classes.push("task--deleted");
                break;
        }
        return (
            <>
                <div
                    className={classes.join(" ")}
                    onTouchStart={status === "pending" && this.down}
                    onTouchEnd={status === "pending" && this.leave}
                    onClick={
                        status !== "pending" && this.handleStatusModalToggle
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
                {status !== "pending" && (
                    <Modal
                        theme="dark"
                        active={this.state.changeStatusModal}
                        toggle={this.handleStatusModalToggle}
                    >
                        <p>
                            Add <strong>{this.props.heading}</strong> back to
                            incomplete tasks?
                        </p>
                        <div class="form__control">
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
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStatus: (taskId, status) =>
            dispatch(updateTaskStatus(taskId, status)),
    };
};

export default connect(null, mapDispatchToProps)(Task);
