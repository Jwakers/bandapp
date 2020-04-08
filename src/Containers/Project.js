import React, { Component } from "react";
import { connect } from "react-redux";
import Progress from "../Components/Project/Progress";
import Task from "../Components/Project/Task";
import { addTask, updateProject } from "../store/actions";
import NewTask from "../Components/Project/NewTask";
import Form from "../Components/Modal/Form";

import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/sort.svg";

class Project extends Component {
    state = {
        addTaskOpen: false
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

    handleFormSubmit = (event, projectId) => {
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
        console.log(this.props);
    };

    render() {
        const completeTasks = this.props.tasks.filter(
            task => task.status === "complete"
        );
        const incompleteTasks = this.props.tasks.filter(
            task => task.status !== "complete"
        );
        return (
            <>
                <div className="project card">
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
                        <div>[Audio]</div>
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
                            total={this.props.tasks.length}
                            seperate
                        />
                    ) : (
                        <div>Add tasks</div>
                    )}
                    {incompleteTasks.map(task => (
                        <Task key={task.id} {...task} />
                    ))}
                    <div className="project__tasks__topbar">
                        <div className="project__tasks__topbar__head heading heading--h2">
                            Complete
                        </div>
                    </div>

                    {completeTasks.map(task => (
                        <Task key={task.id} {...task} />
                    ))}
                    <div
                        onClick={this.handleTaskFormToggle}
                        className="floating-button"
                    >
                        <span className="floating-button__content">+</span>
                    </div>
                    <NewTask
                        submit={this.handleFormSubmit}
                        active={this.state.addTaskOpen}
                        close={this.handleTaskFormToggle}
                    />
                </div>

                <Form
                    open={() => console.log("open")}
                    close={() => console.log("close")}
                    active="true"
                    heading="Edit Project"
                    inputs={[{
                        title: 'Title',
                        value: this.props.project.heading
                    },{
                        title: 'Description',
                        type: 'textarea',
                        value: this.props.project.description
                    },{
                        title: 'Due date',
                        type: 'date',
                        value: this.props.project.dueDate,
                    }]}
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
        updateProject: (projectId, payload) => dispatch(updateProject(projectId, payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
