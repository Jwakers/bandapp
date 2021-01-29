import React from "react";
import { connect } from "react-redux";

import ProjectPreview from "./ProjectPreview";

import * as actions from "../../store/actions"

import { objectStatus } from "../../shared/strings";
import { objectsToArray } from "../../shared/utility"

export const ProjectArchive = (props) => {

    const reIndexProject = (locationId, projectId) => {
        if (window.confirm("Re-index this project?")) {
            props.updateProject(
                locationId,
                projectId,
                { status: objectStatus.pending }
            );
        }
    }

    return (
        <>
            <div className="projects">
                <div className="projects__head">
                    <h1
                        className="projects__head__title heading heading--h1"
                    >
                        Archived Projects
                    </h1>
                    <span className="projects__head__index">
                        {props.projects.length}
                    </span>
                </div>
                {props.projects.map((project) => (
                    <ProjectPreview
                        key={project.id}
                        id={project.id}
                        heading={project.heading}
                        description={project.description}
                        dueDate={project.dueDate}
                        onClick={reIndexProject.bind(this, project.locationId, project.id)}
                    />
                ))}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        projects: objectsToArray(state.projects.projects, true).filter(p => p.status === objectStatus.archived),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (locationId, userId, projectData) =>
            dispatch(actions.updateProject(locationId, userId, projectData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArchive);
