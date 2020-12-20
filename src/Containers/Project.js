import React, { Component } from "react";
import { connect } from "react-redux";

import Progress from "../Components/Project/Progress";
import Task from "../Components/Project/Task";
import * as actions from "../store/actions/index";
import Modal from "../Components/Modal/Modal";
import Form from "../Components/Form/Form";
import Placeholder from "../Components/Message/Placeholder";

import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/sort.svg";

import urls from "../shared/urls";
import {objectStatus} from "../shared/strings";

class Project extends Component {
    state = {
        addTaskOpen: false,
        updateProject: false,
        showDeleted: false,
    };

    handleTaskFormToggle = () => {
        this.setState((prevState) => ({
            addTaskOpen: !prevState.addTaskOpen,
        }));
    };

    handleProjectUpdateFormToggle = () => {
        this.setState((prevState) => ({
            updateProject: !prevState.updateProject,
        }));
    };
    handleTaskStatusModalToggle = () => {
        this.setState((prevState) => ({
            changeStatusModal: !prevState.changeStatusModal,
        }));
    };

    handleTaskFormSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
        };
        const task = {
            projectId: this.props.match.params.projectid,
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            status: objectStatus.pending,
            userId: this.props.userId,
            createdOn: new Date().toString(),
            createdBy: this.props.username
        };
        this.props.createNewTask(task, this.props.userId);
        this.setState({ addTaskOpen: false });
    };
    handleProjectUpdateSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
            bpm: event.target.elements["bpm"].value,
            key: event.target.elements["key"].value,
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            bpm: form.bpm,
            key: form.key,
            status: objectStatus.pending,
        };
        this.props.updateProject(
            this.props.match.params.projectid,
            project,
            this.props.userId
        );
        this.setState({ updateProject: false });
    };
    handleProjectArchive = () => {
        if (window.confirm("Are you sure you want to archive this project?")) {
            this.props.updateProject(this.props.match.params.projectid, {
                status: objectStatus.archived,
            }, this.props.userId);
            this.props.history.push(urls.projects);
        }
    };

    handleDeletedTasksToggle = () => {
        this.setState((prevState) => ({
            archivedTasks: !prevState.archivedTasks,
        }));
    };

    render() {
        let tasks = [];
        for (const [key, value] of Object.entries(this.props.tasks)) {
            tasks.push({ ...value, id: key });
        }

        const incompleteTasks = tasks.filter(
            (task) => task.status === objectStatus.pending
        );
        const completeTasks = tasks.filter(
            (task) => task.status === objectStatus.completed
        );
        const archivedTasks = tasks.filter((task) => task.status === objectStatus.archived);

        if (!this.props.project) return <div className="spinner"></div>;
        return (
            <>
                <div
                    className="project card"
                    onClick={this.handleProjectUpdateFormToggle}
                >
                    <div className="card__wrap">
                        <div className="project__head">
                            <div className="project__head__title heading">
                                {this.props.project.heading}
                            </div>
                            <div className="project__head__assignees">
                                [assignees]
                            </div>
                        </div>

                        <p className="project__desc">
                            {this.props.project.description}
                        </p>
                        <div className="project__info">
                            <div className="project__labels">
                                <div className="label">Label</div>
                                <div className="label">info</div>
                            </div>
                        </div>
                        <div className="project__info-bar">
                            {this.props.project.bpm && (
                                <div className="project__info-bar__item">
                                    BPM:{" "}
                                    <strong>{this.props.project.bpm}</strong>
                                </div>
                            )}

                            {this.props.project.key && (
                                <div className="project__info-bar__item">
                                    Key:{" "}
                                    <strong>{this.props.project.key}</strong>
                                </div>
                            )}
                            <div className="project__info-bar__item">
                                Comments:{" "}
                                <strong>
                                    {this.props.project.comments
                                        ? this.props.project.comments
                                        : 0}
                                </strong>
                            </div>
                            <div className="project__info-bar__item project__info-bar__item--date">
                                <span>Due:</span>{" "}
                                {new Date(
                                    this.props.project.dueDate
                                ).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
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
                    {tasks ? (
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
                    {!tasks.length ? (
                        <Placeholder
                            heading="No tasks"
                            altMessage="Click + to add a new tasks to this project."
                        />
                    ) : null}
                    {incompleteTasks.map((task) => (
                        <Task key={task.id} {...task} />
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
                            {...task}
                            changeStatus={this.handleTaskStatusModalToggle}
                            statusModal={this.state.changeStatusModal}
                        />
                    ))}
                    {archivedTasks.length ? (
                        <>
                            <hr className="project__rule" />
                            <button
                                className="button-subtle"
                                onClick={this.handleDeletedTasksToggle}
                            >
                                {this.state.archivedTasks
                                    ? "Hide archived tasks"
                                    : "Show archived tasks"}
                            </button>
                        </>
                    ) : null}
                    {this.state.archivedTasks &&
                        archivedTasks.map((task) => (
                            <Task
                                key={task.id}
                                {...task}
                                changeStatus={this.handleTaskStatusModalToggle}
                                statusModal={this.state.changeStatusModal}
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
                        active={this.state.addTaskOpen}
                    >
                        <div className="heading heading--h2">
                            {"Add task to " + this.props.project.heading}
                        </div>
                        <Form
                            submit={this.handleTaskFormSubmit}
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
                </div>
                <Modal
                    toggle={this.handleProjectUpdateFormToggle}
                    active={this.state.updateProject}
                >
                    <div className="heading heading--h2">
                        {"Edit " + this.props.project.heading}
                    </div>
                    <Form
                        submit={this.handleProjectUpdateSubmit}
                        buttonText="update"
                        close={this.handleProjectUpdateFormToggle}
                        inputs={[
                            {
                                title: "Title",
                                value: this.props.project.heading,
                            },
                            {
                                title: "Description",
                                type: "textarea",
                                value: this.props.project.description,
                            },
                            {
                                title: "Due date",
                                type: "date",
                                value: this.props.project.dueDate,
                            },
                            {
                                title: "BPM",
                                type: "number",
                                value: this.props.project.bpm,
                            },
                            {
                                title: "Key",
                                type: "select",
                                options: [
                                    "",
                                    "Key of C",
                                    "Key of Db / C#",
                                    "Key of D",
                                    "Key of Eb",
                                    "Key of E",
                                    "Key of F",
                                    "Key of Gb / F#",
                                    "Key of G",
                                    "Key of Ab",
                                    "Key of A",
                                    "Key of Bb",
                                    "Key of B / Cb",
                                ],
                                value: this.props.project.key,
                            },
                        ]}
                    />
                    <button
                        className="button button--warning"
                        onClick={this.handleProjectArchive}
                    >
                        Archive project
                    </button>
                </Modal>
            </>
        );
    }
}

const getTasks = (tasks, projectId) => {
    const arr = [];
    for (const [key, value] of Object.entries(tasks)) {
        if (value.projectId === projectId) {
            arr[key] = value;
        }
    }
    return arr;
};

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects.projects[ownProps.match.params.projectid],
        tasks: getTasks(state.tasks.tasks, ownProps.match.params.projectid),
        token: state.auth.token,
        userId: state.auth.userId,
        username: state.user.user.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTask: (payload, userId) =>
            dispatch(actions.createNewTask(payload, userId)),
        updateProject: (projectId, payload, userId) =>
            dispatch(actions.updateProject(projectId, payload, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
