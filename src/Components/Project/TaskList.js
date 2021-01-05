import React, { useState } from "react";
import { connect } from "react-redux";

import Task from "./Task";
import Placeholder from "../Message/Placeholder";
import Progress from "../Project/Progress";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

import * as actions from "../../store/actions";
import { objectStatus } from "../../shared/strings";
import filterIcon from "../../assets/icons/filter.svg";
import sortIcon from "../../assets/icons/sort.svg";

const TaskList = (props) => {
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const [changeStatusOpen, setChangeStatusOpen] = useState(false);
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [updateForm, setUpdateForm] = useState(null);

    const handleUpdateModalToggle = () => {
        setUpdateTaskOpen(!updateTaskOpen);
    };

    const handleTaskFormToggle = () => {
        setAddTaskOpen(!addTaskOpen);
    };

    const handleArchivedTasksToggle = () => {
        setShowArchivedTasks(!showArchivedTasks);
    };

    const handleStatusModalToggle = () => {
        setChangeStatusOpen(!changeStatusOpen);
    };

    const getTaskData = (taskData) => {
        switch (taskData.status) {
            case objectStatus.completed:
                getAddToIncompleteForm(taskData);
                break;
            case objectStatus.archived:
                getAddToIncompleteForm(taskData);
                break;
            case objectStatus.pending:
                getUpdateForm(taskData);
                break;
            default:
                console.error(`Invalid task status: ${taskData.status}`);
        }
    };

    const addTaskToIncomplete = (taskData) => {
        props.updateTask(taskData.locationId, taskData.id, {
            status: objectStatus.pending,
        });
        setChangeStatusOpen(false);
    };
    const getAddToIncompleteForm = (taskData) => {
        setUpdateForm(
            <>
                <p>
                    Add <strong>{taskData.heading}</strong> back to incomplete
                    tasks?
                </p>
                <div className="form__control">
                    <button
                        className="button-subtle button-subtle--warning"
                        onClick={handleStatusModalToggle}
                    >
                        Cancel
                    </button>
                    <button
                        className="button button--continue"
                        onClick={addTaskToIncomplete.bind(this, taskData)}
                    >
                        Confirm
                    </button>
                </div>
            </>
        );
        handleStatusModalToggle();
    };
    const getUpdateForm = (taskData) => {
        setUpdateForm(
            <Form
                submit={(event) =>
                    handleUpdateTask(event, taskData.locationId, taskData.id)
                }
                buttonText="update"
                inputs={[
                    {
                        title: "Title",
                        value: taskData.heading,
                    },
                    {
                        title: "Description",
                        type: "textarea",
                        value: taskData.description,
                    },
                    {
                        title: "Due date",
                        type: "date",
                        value: taskData.dueDate,
                    },
                ]}
            />
        );
        handleUpdateModalToggle();
    };

    const handleCreateNewTask = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
        };
        const task = {
            projectId: props.projectId,
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            status: objectStatus.pending,
            createdOn: new Date().toString(),
            createdBy: props.userId,
            locationId: props.project.locationId,
        };
        props.createNewTask(task, props.project.locationId);
        setAddTaskOpen(!addTaskOpen);
    };

    const handleUpdateTask = (event, locationId, taskId) => {
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
        props.updateTask(locationId, taskId, task);
        setUpdateTaskOpen(false);
    };

    const filterTasks = (statusValue) =>
        props.tasks.filter((task) => task.status === statusValue);

    const incompleteTasks = filterTasks(objectStatus.pending);
    const completeTasks = filterTasks(objectStatus.completed);
    const archivedTasks = filterTasks(objectStatus.archived);

    return (
        <>
            <div className="project__tasks">
                <div className="project__tasks__topbar">
                    <div className="project__tasks__topbar__head heading heading--h2">
                        Tasks
                    </div>
                    <div className="project__tasks__topbar__filter">
                        <img src={filterIcon} alt="filter" />
                        <img src={sortIcon} alt="sort" />
                    </div>
                </div>
                {props.tasks ? (
                    <Progress
                        complete={completeTasks.length}
                        total={completeTasks.length + incompleteTasks.length}
                        seperate
                    />
                ) : (
                    <div>Add tasks</div>
                )}
                {!props.tasks.length ? (
                    <Placeholder
                        heading="No tasks"
                        altMessage="Click + to add a new tasks to this project."
                    />
                ) : null}
                {incompleteTasks.map((task) => (
                    <Task
                        key={task.id}
                        taskId={task.id}
                        clicked={getTaskData}
                    />
                ))}
                {completeTasks.length ? (
                    <div className="project__tasks__topbar">
                        <div className="project__tasks__topbar__head heading heading--h2">
                            Complete
                        </div>
                    </div>
                ) : null}
                {completeTasks.map((task) => (
                    <Task
                        complete
                        key={task.id}
                        taskId={task.id}
                        clicked={getTaskData}
                    />
                ))}
                {archivedTasks.length ? (
                    <>
                        <hr className="project__rule" />
                        <button
                            className="button-subtle"
                            onClick={handleArchivedTasksToggle}
                        >
                            {showArchivedTasks
                                ? "Hide archived tasks"
                                : "Show archived tasks"}
                        </button>
                    </>
                ) : null}
                {showArchivedTasks &&
                    archivedTasks.map((task) => (
                        <Task
                            key={task.id}
                            taskId={task.id}
                            clicked={getTaskData}
                        />
                    ))}

                <div onClick={handleTaskFormToggle} className="floating-button">
                    <span className="floating-button__content">+</span>
                </div>
                <Modal toggle={handleTaskFormToggle} active={addTaskOpen}>
                    <div className="heading heading--h2">
                        {"Add task to " + props.project.heading}
                    </div>
                    <Form
                        submit={handleCreateNewTask}
                        inputs={[
                            {
                                title: "Title",
                                placeholder: "Task title",
                                required: true,
                            },
                            {
                                title: "Description",
                                type: "textarea",
                                placeholder: "Task description",
                            },
                            {
                                title: "Due date",
                                type: "date",
                            },
                        ]}
                    />
                </Modal>
                {updateForm && (
                    <Modal
                        toggle={handleUpdateModalToggle}
                        active={updateTaskOpen}
                    >
                        <div className="heading">{"Edit task"}</div>
                        {updateForm}
                    </Modal>
                )}
                <Modal
                    theme="dark"
                    toggle={handleStatusModalToggle}
                    active={changeStatusOpen}
                >
                    {updateForm}
                </Modal>
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: Object.entries(state.tasks.tasks).reduce((result, task) => {
            const [key, value] = [...task];
            if (value.projectId === ownProps.projectId)
                result.push({ ...value, id: key });
            return result;
        }, []),
        project: state.projects.projects[ownProps.projectId],
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTask: (payload, locationId) =>
            dispatch(actions.createNewTask(payload, locationId)),
        updateTask: (taskId, userId, taskData) =>
            dispatch(actions.updateTask(taskId, userId, taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
