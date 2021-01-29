import React, { PureComponent } from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions/index";
import Modal from "../Components/Modal/Modal";
import UpdateProjectForm from "../Components/Form/UpdateProjectForm";

import TaskList from "./TaskList";
import Comments from "../Components/Comments/Comments";

import urls from "../shared/urls";
import { objectStatus } from "../shared/strings";
import { formatDate } from "../shared/utility";

class Project extends PureComponent {
    state = {
        addTaskOpen: false,
        updateProject: false,
        showDeleted: false,
        showComments: false,
    };

    componentDidMount() {
        this.props.fetchComments(this.props.match.params.projectid);
    }

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

    handleProjectArchive = () => {
        if (window.confirm("Are you sure you want to archive this project?")) {
            this.props.updateProject(
                this.props.project.locationId,
                this.props.match.params.projectid,
                {
                    status: objectStatus.archived,
                },
                this.props.userId
            );
            this.props.history.push(urls.projects);
        }
    };
    handleProjectDelete = () => {
        if (
            window.confirm(
                "Are you sure you want to delete this project, this can not be undone?"
            )
        ) {
            this.props.deleteProject(
                this.props.project.locationId,
                this.props.match.params.projectid
            );
            this.props.history.push(urls.projects);
        }
    };

    handleDeletedTasksToggle = () => {
        this.setState((prevState) => ({
            archivedTasks: !prevState.archivedTasks,
        }));
    };

    toggleComments = () => {
        this.setState((prevState) => ({
            showComments: !prevState.showComments,
        }));
    };

    render() {
        if (!this.props.project) return <div className="spinner"></div>;
        return (
            <>
                <div className="project card">
                    <div className="card__wrap">
                        <div className="project__head">
                            <div className="project__head__title heading">
                                {this.props.project.heading}
                            </div>
                            <div
                                className="project__head__edit"
                                onClick={this.handleProjectUpdateFormToggle}
                            >
                                <i className="material-icons">create</i>
                            </div>
                        </div>

                        <p className="project__desc">
                            {this.props.project.description}
                        </p>
                        <div className="project__info">
                            {this.props.project.bpm && (
                                <div className="project__info__item">
                                    BPM:{" "}
                                    <strong>{this.props.project.bpm}</strong>
                                </div>
                            )}

                            {this.props.project.key && (
                                <div className="project__info__item">
                                    Key:{" "}
                                    <strong>{this.props.project.key}</strong>
                                </div>
                            )}
                            <div
                                className="project__info__item"
                                onClick={this.toggleComments}
                            >
                                Comments:{" "}
                                <strong>
                                    {this.props.commentsIndex}
                                </strong>
                            </div>
                            <div className="project__info__item project__info__item--end">
                                {formatDate(this.props.project.dueDate)}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showComments ? (
                    <Comments
                        projectId={this.props.match.params.projectid}
                    />
                ) : null}
                <TaskList projectId={this.props.match.params.projectid} />
                <Modal
                    toggle={this.handleProjectUpdateFormToggle}
                    active={this.state.updateProject}
                >
                    <div className="heading heading--h2 heading--form">
                        Edit Project
                    </div>
                    <UpdateProjectForm
                        projectId={this.props.match.params.projectid}
                        close={this.handleProjectUpdateFormToggle}
                    />
                    <button
                        className="button button--warning"
                        onClick={this.handleProjectArchive}
                    >
                        Archive project
                    </button>
                    <button
                        className="button button--warning"
                        onClick={this.handleProjectDelete}
                    >
                        Delete project
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
        username: state.user.user.username,
        commentsIndex: Object.keys(state.comments.comments).length,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (locationId, userId, projectData) =>
            dispatch(actions.updateProject(locationId, userId, projectData)),
        deleteProject: (locationId, projectId) =>
            dispatch(actions.deleteProject(locationId, projectId)),
        fetchComments: (projectId) =>
            dispatch(actions.fetchComments(projectId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
