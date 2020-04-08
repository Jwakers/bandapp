import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectPreview from "../Project/ProjectPreview";

const projectList = props => (
            <>
                <div className="projects">
                    <div>
                        <h1 className="heading heading--h1">Projects</h1>
                        <span className="projects__index">
                            {props.projects.length}
                        </span>
                    </div>
                    {props.projects.map(project => (
                        <Link to={`/${project.id}`} key={project.id}>
                            <ProjectPreview
                                id={project.id}
                                heading={project.heading}
                                description={project.description}
                                tasks={
                                    project.tasks ? project.tasks : null
                                }
                                dueDate={project.dueDate}
                            />
                        </Link>
                    ))}
                    
                </div>
            </>
        )

const mapStateToProps = state => {
    return {
        projects: state.projects,
    };
};

export default connect(mapStateToProps)(projectList);
