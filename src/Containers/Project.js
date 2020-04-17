import React, { Component } from "react";
import { connect } from "react-redux";
import Progress from "../Components/Project/Progress";
import Task from "../Components/Project/Task";
import { addTask, updateProject } from "../store/actions";
import Form from "../Components/Modal/Form";

import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/sort.svg";

class Project extends Component {
    state = {
        addTaskOpen: false,
        updateProject: false,
        showDeleted: false,
    };

    createID() {
        return (
            "_" +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
    }

    handleTaskFormToggle = () => {
        this.setState(prevState => ({
            addTaskOpen: !prevState.addTaskOpen
        }));
    };

    handleProjectUpdateFormToggle = () => {
        this.setState(prevState => ({
            updateProject: !prevState.updateProject
        }));
    };
    handleTaskStatusModalToggle = () => {
        this.setState(prevState => ({
            changeStatusModal: !prevState.changeStatusModal
        }));
    }

    handleTaskFormSubmit = event => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value
        };
        const task = {
            id: this.createID(),
            projectId: this.props.project.id,
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate
        };
        this.props.addTask(task);
        this.setState({ addTaskOpen: false });
    };
    handleProjectUpdateSubmit = event => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
            bpm: event.target.elements["bpm"].value,
            key: event.target.elements["key"].value,
            demo: event.target.elements["demo"].value
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            info: {
                bpm: form.bpm,
                key: form.key,
                demo: form.demo
            }
        };
        this.props.updateProject(this.props.project.id, project);
        this.setState({ updateProject: false });
    };

    handleDeletedTasksToggle = () => {
        this.setState(prevState => ({ deletedTasks: !prevState.deletedTasks }));
    };

    render() {
        const incompleteTasks = this.props.tasks.filter(
            task => task.status === "pending"
        );
        const completeTasks = this.props.tasks.filter(
            task => task.status === "complete"
        );
        const deletedTasks = this.props.tasks.filter(
            task => task.status === "deleted"
        );

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
                            <div className="project__date">
                                {this.props.project.dueDate}
                            </div>
                        </div>
                        <div>Upload demo - [Demo link]</div>
                        <div className="project__info-bar">
                            {this.props.project.info.bpm && (
                                <div>
                                    BPM:{" "}
                                    <strong>
                                        {this.props.project.info.bpm}
                                    </strong>
                                </div>
                            )}

                            {this.props.project.info.key && (
                                <div>
                                    Key:{" "}
                                    <strong>
                                        {this.props.project.info.key}
                                    </strong>
                                </div>
                            )}
                            {this.props.project.info.length && (
                                <div>
                                    Length:{" "}
                                    <strong>
                                        {this.props.project.info.length.toFixed(
                                            2
                                        )}
                                    </strong>
                                </div>
                            )}
                            <div>
                                Comments:{" "}
                                <strong>
                                    {this.props.project.info.comments
                                        ? this.props.project.info.comments
                                        : 0}
                                </strong>
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
                    {this.props.tasks ? (
                        <Progress
                            complete={completeTasks.length}
                            total={completeTasks.length + incompleteTasks.length}
                            seperate
                        />
                    ) : (
                        <div>Add tasks</div>
                    )}
                    {incompleteTasks.map(task => (
                        <Task key={task.id} {...task} />
                    ))}
                    {completeTasks.length ? (
                        <div className="project__tasks__topbar">
                            <div className="project__tasks__topbar__head heading heading--h2">
                                Complete
                            </div>
                        </div>
                    ) : null}

                    {completeTasks.map(task => (
                        <Task complete key={task.id} {...task} changeStatus={this.handleTaskStatusModalToggle} statusModal={this.state.changeStatusModal} />
                    ))}
                    {deletedTasks.length ? (
                        <>
                            <hr className="project__rule" />
                            <button
                                className="button-subtle"
                                onClick={this.handleDeletedTasksToggle}
                            >
                                {this.state.deletedTasks
                                    ? "Hide deleted tasks"
                                    : "Show deleted tasks"}
                            </button>
                        </>
                    ) : null}
                    {this.state.deletedTasks &&
                        deletedTasks.map(task => (
                            <Task key={task.id} {...task} changeStatus={this.handleTaskStatusModalToggle} statusModal={this.state.changeStatusModal} />
                        ))}

                    <div
                        onClick={this.handleTaskFormToggle}
                        className="floating-button"
                    >
                        <span className="floating-button__content">+</span>
                    </div>
                    <Form
                        submit={this.handleTaskFormSubmit}
                        toggle={this.handleTaskFormToggle}
                        active={this.state.addTaskOpen}
                        heading={"Add task to " + this.props.project.heading}
                        inputs={[
                            {
                                title: "Title",
                                placeholder: "Task title",
                                required: true
                            },
                            {
                                title: "Description",
                                type: "textarea",
                                placeholder: "Task description"
                            },
                            {
                                title: "Due date",
                                type: "date"
                            }
                        ]}
                    />
                </div>

                <Form
                    submit={this.handleProjectUpdateSubmit}
                    toggle={this.handleProjectUpdateFormToggle}
                    active={this.state.updateProject}
                    heading={"Edit " + this.props.project.heading}
                    buttonText="update"
                    inputs={[
                        {
                            title: "Title",
                            value: this.props.project.heading,
                        },
                        {
                            title: "Description",
                            type: "textarea",
                            value: this.props.project.description
                        },
                        {
                            title: "Due date",
                            type: "date",
                            value: this.props.project.dueDate
                        },
                        {
                            title: "BPM",
                            type: "number",
                            value: this.props.project.info.bpm
                        },
                        {
                            title: "Key",
                            type: "select",
                            options: [
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
                                "Key of B / Cb"
                            ],
                            value: this.props.project.info.key
                        },
                        {
                            title: "Demo Link",
                            name: "demo",
                            value: this.props.project.info.demo
                        }
                    ]}
                />
            </>
        );
    }
}

const getProject = (projects, id) => {
    return projects.find(project => project.id === id);
};
const getTasks = (tasks, projectId) => {
    return tasks.filter(task => task.projectId === projectId);
};

const mapStateToProps = (state, ownProps) => {
    return {
        project: getProject(state.projects, ownProps.match.params.projectid),
        tasks: getTasks(state.tasks, ownProps.match.params.projectid)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTask: payload => dispatch(addTask(payload)),
        updateProject: (projectId, payload) =>
            dispatch(updateProject(projectId, payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
