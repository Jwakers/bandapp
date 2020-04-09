import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "../Components/Project/ProjectList";
import SideMenu from "../Components/Navigation/SideMenu";
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from "./Project";
import Form from "../Components/Modal/Form"

import { addProject } from "../store/actions";

class Layout extends Component {
    state = {
        sideMenuOpen: false,
        newProjectOpen: false
    };
    createID() {
        return (
            "_" +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
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
            id: this.createID(),
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate
        };
        this.props.addProject(project);
        this.setState({ newProjectOpen: false });
    };
    render() {
        return (
            <>
                <Topnav heading="Bandapp" toggle={this.handleMenuToggle} />
                <SideMenu
                    toggle={this.handleMenuToggle}
                    active={this.state.sideMenuOpen}
                    projects={this.props.projects.length}
                />
                <main className="container">
                    <Switch>
                        <Route path="/:projectid" component={Project} />
                        <Route path="/" exact component={ProjectList} />
                    </Switch>
                </main>
                <Form
                    submit={this.handleFormSubmit}
                    open={this.handleNewProjectToggle}
                    close={this.handleNewProjectToggle}
                    active={this.state.newProjectOpen}
                    heading="Create project"
                    inputs={[{
                        title: 'Title',
                        placeholder: 'Project title'
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
        addProject: payload => dispatch(addProject(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
