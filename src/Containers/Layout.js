import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "../Components/Project/ProjectList";
import SideMenu from "../Components/Navigation/SideMenu";
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from "./Project";
import Auth from "./Auth";
import Modal from "../Components/Modal/Modal";
import Form from "../Components/Form/Form";

import * as actions from "../store/actions/index";

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
            status: "pending",
        };
        this.props.createNewProject(project, this.props.userId);
        this.setState({ newProjectOpen: false });
    };
    render() {
        return (
            <>
                <Topnav
                    heading="Bandapp"
                    toggle={this.handleMenuToggle}
                    isAuth={this.props.userId}
                />
                <SideMenu
                    toggle={this.handleMenuToggle}
                    active={this.state.sideMenuOpen}
                    projects={Object.keys(this.props.projects).length}
                />
                {this.props.loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>
                        <main className="container">
                            <Switch>
                                <Route path="/account" exact component={Auth} />
                                {this.props.userId ? (
                                    <>
                                        <Route
                                            path="/:projectid"
                                            component={Project}
                                        />
                                        <Route
                                            path="/"
                                            exact
                                            component={ProjectList}
                                        />
                                    </>
                                ) : (
                                    <Redirect to="/account" />
                                )}
                                <Redirect to="/" />
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
