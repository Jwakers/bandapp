import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "./Task";
import Placeholder from "../Message/Placeholder";
import Progress from "../Project/Progress";
import Modal from "../Modal/Modal";
import UpdateTaskForm from "../Form/UpdateTaskForm";
import CreateTaskForm from "../Form/CreateTaskForm";

import * as actions from "../../store/actions";
import { objectStatus } from "../../shared/strings";
import filterIcon from "../../assets/icons/filter.svg";
import sortIcon from "../../assets/icons/sort.svg";

class TaskList extends Component {
    state = {
        addTaskOpen: false,
        updateTaskOpen: false,
        changeStatusOpen: false,
        updateForm: null,
    };

    handleUpdateModalToggle = () => {
        this.setState((prev) => ({
            updateTaskOpen: !prev.updateTaskOpen,
        }));
        // this.setUpdateTaskOpen(!updateTaskOpen);
    };

    handleTaskFormToggle = () => {
        this.setState((prev) => ({
            addTaskOpen: !prev.addTaskOpen,
        }));
        // setAddTaskOpen(!addTaskOpen);
    };

    handleStatusModalToggle = () => {
        this.setState((prev) => ({
            changeStatusOpen: !prev.changeStatusOpen,
        }));
        // setChangeStatusOpen(!changeStatusOpen);
    };

    getTaskData = (taskData) => {
        console.log(taskData)
        switch (taskData.status) {
            case objectStatus.completed:
                this.getAddToIncompleteForm(taskData);
                break;
            case objectStatus.pending:
                this.getUpdateForm(taskData);
                break;
            default:
                console.error(`Invalid task status: ${taskData.status}`);
        }
    };

    addTaskToIncomplete = (taskData) => {
        this.props.updateTask(taskData.locationId, taskData.id, {
            status: objectStatus.pending,
        });
        this.setChangeStatusOpen(false);
    };
    
    getAddToIncompleteForm = (taskData) => {
        this.setState(() => ({
            updateForm: (
                <>
                    <p>
                        Add <strong>{taskData.heading}</strong> back to
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
                            onClick={this.addTaskToIncomplete.bind(
                                this,
                                taskData
                            )}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            ),
        }));
        this.handleStatusModalToggle();
    };
    getUpdateForm = (taskData) => {
        console.log(taskData)
        this.setState(() => ({
            updateForm: (
                <UpdateTaskForm
                    onSubmit={(e) =>
                        this.handleUpdateTask(
                            e,
                            taskData.locationId,
                            taskData.id
                        )
                    }
                    task={taskData}
                    close={this.handleTaskFormToggle}
                />
            ),
        }));
        this.handleUpdateModalToggle();
    };

    handleCreateNewTask = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["dueDate"].value,
        };
        const task = {
            projectId: this.props.projectId,
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            status: objectStatus.pending,
            createdOn: new Date().toString(),
            createdBy: this.props.userId,
            locationId: this.props.project.locationId,
        };
        this.props.createNewTask(task, this.props.project.locationId);
        this.handleTaskFormToggle();
    };

    handleUpdateTask = (event, locationId, taskId) => {
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
        this.props.updateTask(locationId, taskId, task);
        this.setState(() => ({
            updateTaskOpen: false,
        }));
    };

    render() {
        const filterTasks = (statusValue) =>
            this.props.tasks.filter((task) => task.status === statusValue);

        const incompleteTasks = filterTasks(objectStatus.pending);
        const completeTasks = filterTasks(objectStatus.completed);
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
                    {this.props.tasks ? (
                        <Progress
                            complete={completeTasks.length}
                            total={
                                completeTasks.length + incompleteTasks.length
                            }
                            seperate
                        />
                    ) : (
                        <div>Add tasks</div>
                    )}
                    {!this.props.tasks.length ? (
                        <Placeholder
                            heading="No tasks"
                            altMessage="Click + to add a new tasks to this project."
                        />
                    ) : null}
                    {incompleteTasks.map((task) => (
                        <Task
                            key={task.id}
                            taskId={task.id}
                            onClick={this.getTaskData}
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
                            onClick={this.getTaskData}
                        />
                    ))}

                    <div
                        onClick={this.handleTaskFormToggle}
                        className="floating-button"
                    >
                        <span className="floating-button__content">+</span>
                    </div>
                    <Modal
                        toggle={this.handleTaskFormToggle}
                        active={this.addTaskOpen}
                    >
                        <div className="heading heading--h2">
                            {"Add task to " + this.props.project.heading}
                        </div>
                        <CreateTaskForm
                            onSubmit={(e) => this.handleCreateNewTask(e)}
                            close={this.handleTaskFormToggle}
                        />
                    </Modal>
                    {this.state.updateForm && (
                        <Modal
                            toggle={this.handleUpdateModalToggle}
                            active={this.state.updateTaskOpen}
                        >
                            <div className="heading">{"Edit task"}</div>
                            {this.state.updateForm}
                        </Modal>
                    )}
                    <Modal
                        theme="dark"
                        toggle={this.handleStatusModalToggle}
                        active={this.state.changeStatusOpen}
                    >
                        {this.state.updateForm}
                    </Modal>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: Object.entries(state.tasks.tasks).reduce((result, task) => {
            const [key, value] = [...task];
            if (value.projectId === ownProps.projectId)
                result.push({ ...value, id: key });
            return result;
        }, []),
        project: state.projects.projects[ownProps.projectId],
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTask: (payload, projectId) =>
            dispatch(actions.createNewTask(payload, projectId)),
        updateTask: (taskId, projectId, taskData) =>
            dispatch(actions.updateTask(taskId, projectId, taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
