import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "../Components/Project/ProjectList";
import SideMenu from "../Components/Navigation/SideMenu";
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from "./Project";
import Form from "../Components/Modal/Form"

import * as actions from "../store/actions/index";

class Layout extends Component {
    state = {
        sideMenuOpen: false,
        newProjectOpen: false
    };

    componentDidMount() {
        this.props.fetchProjects();
        this.props.fetchTasks()
    }

    handleMenuToggle = () => {
        this.setState(prevState => ({ sideMenuOpen: !prevState.sideMenuOpen }));
    };
    handleNewProjectToggle = () => {
        this.setState(prevState => ({ newProjectOpen: !prevState.newProjectOpen }));
    };
    handleFormSubmit = event => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate
        };
        this.props.createNewProject(project);
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
                        <Route path="/:projectid" component={Project} />
                        <Route path="/" exact component={ProjectList} />
                    </Switch>
                </main>
                <Form
                    submit={this.handleFormSubmit}
                    toggle={this.handleNewProjectToggle}
                    active={this.state.newProjectOpen}
                    heading="Create project"
                    inputs={[{
                        title: 'Title',
                        placeholder: 'Project title',
                        required: true,
                    },{
                        title: 'Description',
                        type: 'textarea',
                        placeholder: 'Project description'
                    },{
                        title: 'Due date',
                        type: 'date',
                    }]}
                />
                <Thumbnav newProjectOpen={this.handleNewProjectToggle} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => dispatch(actions.fetchProjects()),
        fetchTasks: () => dispatch(actions.fetchTasks()),
        createNewProject: payload => dispatch(actions.createNewProject(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
