import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectPreview from "../Project/ProjectPreview";

const projectList = (props) => {
    let projects = []
    for (const [key, value] of Object.entries(props.projects))  {
        projects.push({...value, id: key })
    }
    if (props.projects.loading) return <div className="spinner"></div>;
    return (
        <>
            <div className="projects">
                <div>
                    <h1 className="heading heading--h1">Projects</h1>
                    <span className="projects__index">
                        {projects.length}
                    </span>
                </div>
                {projects.map((project) => (
                    <Link to={`/${project.id}`} key={project.id}>
                        <ProjectPreview
                            id={project.id}
                            heading={project.heading}
                            description={project.description}
                            tasks={project.tasks ? project.tasks : null}
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
        loading: state.projects.loading
    };
};

export default connect(mapStateToProps)(projectList);
