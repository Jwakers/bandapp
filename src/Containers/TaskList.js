import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "../Components/Project/Task";
import Placeholder from "../Components/Message/Placeholder";
import Progress from "../Components/Project/Progress";
import Modal from "../Components/Modal/Modal";
import CreateTaskForm from "../Components/Form/CreateTaskForm";

import * as actions from "../store/actions";
import { objectStatus } from "../shared/strings";
import { objectsToArray } from "../shared/utility";

class TaskList extends Component {
    state = {
        addTaskOpen: false
    };

    handleTaskFormToggle = () => {
        this.setState((prev) => ({
            addTaskOpen: !prev.addTaskOpen,
        }));
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
                            <i className="material-icons">filter_list</i>
                            <i className="material-icons">sort</i>
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
                        />
                    ))}

                    <i
                        className="material-icons md-48 floating-button floating-button--green"
                        onClick={this.handleTaskFormToggle}
                    >
                        add
                    </i>
                    <Modal
                        toggle={this.handleTaskFormToggle}
                        active={this.state.addTaskOpen}
                    >
                        <div className="heading heading--h2">
                            {`Add task to ${this.props.project.heading}`}
                        </div>
                        <CreateTaskForm
                            onSubmit={(e) => this.handleCreateNewTask(e)}
                            close={this.handleTaskFormToggle}
                        />
                    </Modal>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: objectsToArray(state.tasks.tasks, true).filter(
            (t) => t.projectId === ownProps.projectId
        ),
        project: state.projects.projects[ownProps.projectId],
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTask: (payload, projectId) =>
            dispatch(actions.createNewTask(payload, projectId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
