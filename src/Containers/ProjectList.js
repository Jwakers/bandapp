import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ADD_PROJECT } from "../store/actions";

import ProjectPreview from "../Components/ProjectPreview";
import NewProject from "../Components/NewProject";

class Projects extends Component {
    state = {
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

    handleNewProjectOpen = () => {
        this.setState({ newProjectOpen: true });
    };
    handleNewProjectClose = () => {
        this.setState({ newProjectOpen: false });
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
                <div className="projects">
                    <div>
                        <h1 className="heading heading--h1">Projects</h1>
                        <span className="projects__index">
                            {this.props.projects.length}
                        </span>
                    </div>
                    {this.props.projects.map(project => (
                        <Link to={`/${project.id}`} key={project.id}>
                            <ProjectPreview
                                id={project.id}
                                heading={project.heading}
                                description={project.description}
                                subtasks={
                                    project.subtasks ? project.subtasks : null
                                }
                                dueDate={project.dueDate}
                                click={this.openProject}
                            />
                        </Link>
                    ))}
                    <NewProject
                        form={this.state.newProjectForm}
                        submit={this.handleFormSubmit}
                        active={this.state.newProjectOpen}
                        close={this.handleNewProjectClose}
                    />
                </div>
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
        addProject: payload => dispatch({ type: ADD_PROJECT, payload: payload })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
