import React, { createRef, Component } from "react";
import { connect } from "react-redux";

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

    componentDidMount() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => this.taskRef.current.classList.add("task--set"))
        })
    }
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
                        this.props.task.locationId,
                        this.props.taskId,
                        { status: objectStatus.completed }
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
                        this.props.task.locationId,
                        this.props.taskId,
                        { status: objectStatus.archived }
                    );
                });
            });
        });
    };

    resetTransition = (element) => (element.style.transform = null);

    revertTaskStatus = () => {
        this.props.updateTask(
            this.props.task.locationId,
            this.props.taskId,
            { status: objectStatus.pending }
        );
    };

    render() {
        const classes = ["task", "card"];
        switch (this.props.task.status) {
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
                            this.props.task.status === objectStatus.pending ? this.down : undefined
                        }
                        onTouchEnd={
                            this.props.task.status === objectStatus.pending ? this.leave : undefined
                        }
                        onClick={this.props.clicked.bind(this, {...this.props.task, id: this.props.taskId})}
                        ref={this.taskRef}
                    >
                        <div className="task__wrap card__wrap">
                            <div className="task__content">
                                <div className="task__title">
                                    {this.props.task.heading}
                                </div>
                                <div className="task__description">
                                    {this.props.task.description}
                                </div>
                            </div>
                            <div className="task__assignee">
                                [assignee]
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
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        task: state.tasks.tasks[ownProps.taskId],
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (taskId, userId, taskData) =>
            dispatch(actions.updateTask(taskId, userId, taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
