import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "../Components/Project/ProjectList";
import SideMenu from "../Components/Navigation/SideMenu";
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from "./Project";
import Band from "./Band";
import Account from "../Components/User/Account";
import Auth from "./Auth";
import Modal from "../Components/Modal/Modal";
import Form from "../Components/Form/Form";
import ProjectArchive from "../Components/Project/ProjectArchive"

import * as actions from "../store/actions/index";
import urls from "../shared/urls";
import {objectStatus} from "../shared/strings"

class Layout extends Component {
    state = {
        sideMenuOpen: false,
        newProjectOpen: false,
    };

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.props.fetchProjects(this.props.userId);
            this.props.fetchTasks(this.props.userId);
        }
    }

    handleMenuToggle = () => {
        this.setState((prevState) => ({
            sideMenuOpen: !prevState.sideMenuOpen,
        }));
    };
    handleNewProjectToggle = () => {
        this.setState((prevState) => ({
            newProjectOpen: !prevState.newProjectOpen,
        }));
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            userId: this.props.userId,
            status: objectStatus.pending,
            createdOn: new Date().toString(),
            createdBy: this.props.username,
        };
        this.props.createNewProject(project, this.props.userId);
        this.setState({ newProjectOpen: false });
    };
    render() {
        return (
            <>
                <Topnav
                    heading={"Bandapp"}
                    toggle={this.handleMenuToggle}
                    isAuth={this.props.userId}
                />
                <SideMenu
                    toggle={this.handleMenuToggle}
                    active={this.state.sideMenuOpen}
                    projects={Object.values(this.props.projects).filter(p => p.status === objectStatus.pending).length}
                />
                {this.props.loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>
                        <main className="container">
                            <Switch>
                                <Route
                                    path={urls.auth}
                                    exact
                                    component={Auth}
                                />
                                {this.props.userId ? (
                                    <>
                                        <Route
                                            path={urls.account}
                                            exact
                                            component={Account}
                                        />
                                        <Route
                                            path={urls.project}
                                            component={Project}
                                        />
                                        <Route
                                            path={urls.bands}
                                            component={Band}
                                            exact
                                        />
                                        <Route
                                            path={urls.archive}
                                            exact
                                        >
                                            <ProjectArchive heading="Project archive" />
                                        </Route>
                                        <Route
                                            path={urls.projects}
                                            exact
                                        >
                                            <ProjectList status={objectStatus.pending} />
                                        </Route>
                                    </>
                                ) : (
                                    <Redirect to={urls.auth} />
                                )}
                                <Redirect to={urls.projects} />
                            </Switch>
                        </main>
                        <Modal
                            toggle={this.handleNewProjectToggle}
                            active={this.state.newProjectOpen}
                        >
                            <div className="heading">Create project</div>
                            <Form
                                submit={this.handleFormSubmit}
                                heading="Create project"
                                inputs={[
                                    {
                                        title: "Title",
                                        placeholder: "Project title",
                                        required: true,
                                    },
                                    {
                                        title: "Description",
                                        type: "textarea",
                                        placeholder: "Project description",
                                    },
                                    {
                                        title: "Due date",
                                        type: "date",
                                    },
                                ]}
                            />
                        </Modal>
                    </>
                )}
                <Thumbnav
                    newProjectOpen={this.handleNewProjectToggle}
                    isAuth={this.props.userId}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        loading: state.projects.loading,
        userId: state.auth.userId,
        username: state.user.user.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (userId) => dispatch(actions.fetchProjects(userId)),
        fetchTasks: (userId) => dispatch(actions.fetchTasks(userId)),
        createNewProject: (payload, userId) =>
            dispatch(actions.createNewProject(payload, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
