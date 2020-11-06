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

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.fetchProjects(this.props.token);
            this.props.fetchTasks(this.props.token);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.props.fetchProjects(this.props.token);
            this.props.fetchTasks(this.props.token);
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
        };
        this.props.createNewProject(project, this.props.token);
        this.setState({ newProjectOpen: false });
    };
    render() {
        return (
            <>
                <Topnav heading="Bandapp" toggle={this.handleMenuToggle} />
                <SideMenu
                    toggle={this.handleMenuToggle}
                    active={this.state.sideMenuOpen}
                    projects={Object.keys(this.props.projects).length}
                />
                <main className="container">
                    <Switch>
                        <Route path="/account" exact component={Auth} />
                        {this.props.token ? (
                            <>
                                <Route path="/:projectid" component={Project} />
                                <Route path="/" exact component={ProjectList} />
                            </>
                        ) : (
                            <Redirect to="/account" />
                        )}
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

                <Thumbnav newProjectOpen={this.handleNewProjectToggle} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (token) => dispatch(actions.fetchProjects(token)),
        fetchTasks: (token) => dispatch(actions.fetchTasks(token)),
        createNewProject: (payload, token) =>
            dispatch(actions.createNewProject(payload, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
