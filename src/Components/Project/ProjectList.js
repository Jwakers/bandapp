import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectPreview from "../Project/ProjectPreview";
import Placeholder from "../Message/Placeholder"
import addIcon from '../../assets/icons/add.svg'

import urls from '../../shared/urls';


const projectList = (props) => {
    let projects = []
    for (const [key, value] of Object.entries(props.projects))  {
        if (value.status === props.status) {
            projects.push({...value, id: key })
        }
    }
    if (props.projects.loading) return <div className="spinner"></div>;
    if (Object.entries(props.projects).length === 0) return <Placeholder heading="Looks like you have no projects" icon={addIcon} modifier="placeholder-message--center" />
    return (
        <>
            <div className="projects">
                <div>
                    <h1 className="heading heading--h1">{props.heading ? props.heading : 'Projects'}</h1>
                    <span className="projects__index">
                        {projects.length}
                    </span>
                </div>
                {projects.map((project) => (
                    <Link to={`${urls.projects}/${project.id}`} key={project.id}>
                        <ProjectPreview
                            id={project.id}
                            heading={project.heading}
                            description={project.description}
                            dueDate={project.dueDate}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        tasks: state.tasks.tasks,
        loading: state.projects.loading
    };
};

export default connect(mapStateToProps)(projectList);
