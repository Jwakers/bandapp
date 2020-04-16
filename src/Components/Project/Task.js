import React, { useEffect, createRef } from "react";
import { connect } from "react-redux";

import { updateTaskStatus } from "../../store/actions";

const Task = props => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            taskRef.current.classList.add("task--set");
        }, 0);
    }, []);
    const taskRef = createRef();
    const position = {
        down: null,
        move: null,
        up: null
    };
    const down = event => {
        position.down = event.touches[0].clientX;
        event.currentTarget.addEventListener("touchmove", move, false);
        event.currentTarget.classList.add("task--sliding");
    };
    const move = event => {
        position.move = position.down - event.touches[0].clientX;
        event.currentTarget.style.transform = `translateX(${-position.move}px)`;
    };
    const leave = event => {
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

    const complete = element => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-right");

                element.addEventListener("transitionend", () => {
                    props.updateTaskStatus(props.id, "complete");
                });
                // Change status in state on componendWillUnmount or useEffect
            });
        });
    };
    const deleteEl = element => {
        element.classList.add("task--transition");
        element.style.height = `${element.offsetHeight}px`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resetTransition(element);
                element.classList.add("task--shrink");
                element.classList.add("task--out-left");

                element.addEventListener("transitionend", () => {
                    props.updateTaskStatus(props.id, "deleted");
                });
            });
        });
    };
    const resetTransition = element => (element.style.transform = null);

    const changeStatus = () => {
        console.log("Change status modal");
    };

    switch (props.status) {
        case "complete":
            return (
                <div
                    className="task task--complete card"
                    onClick={changeStatus}
                    data-id={props.id}
                    ref={taskRef}
                >
                    <div className="task__wrap card__wrap">
                        <div className="task__content">
                            <div className="task__title">{props.heading}</div>
                            <div className="task__description">
                                {props.description}
                            </div>
                        </div>
                        <div className="task__assignee">{props.assignee}</div>
                    </div>
                </div>
            );
            break;
        case "deleted":
            return (
                <div
                    className="task task--deleted card"
                    onClick={changeStatus}
                    data-id={props.id}
                    ref={taskRef}
                >
                    <div className="task__wrap card__wrap">
                        <div className="task__content">
                            <div className="task__title">{props.heading}</div>
                            <div className="task__description">
                                {props.description}
                            </div>
                        </div>
                        <div className="task__assignee">{props.assignee}</div>
                    </div>
                </div>
            );
            break;
        default:
            return (
                <div
                    className="task card"
                    onTouchStart={down}
                    onTouchEnd={leave}
                    data-id={props.id}
                    ref={taskRef}
                >
                    <div className="task__wrap card__wrap">
                        <div className="task__content">
                            <div className="task__title">{props.heading}</div>
                            <div className="task__description">
                                {props.description}
                            </div>
                        </div>
                        <div className="task__assignee">{props.assignee}</div>
                    </div>
                </div>
            );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTaskStatus: (taskId, status) =>
            dispatch(updateTaskStatus(taskId, status))
    };
};

export default connect(null, mapDispatchToProps)(Task);
