import React from "react";
import { connect } from "react-redux";

const project = props => (
    <div className="project">
        <div className="container container--box">
            <div className="project__head">
                <div className="project__head__title heading">
                    {props.project.heading}
                </div>
                <div className="project__head__assignees">[assignees]</div>
            </div>

            <p className="project__desc">{props.project.description}</p>
            <div className="project__info">
                <div className="project__labels">
                    <div className="label">Label</div>
                    <div className="label">info</div>
                </div>
                <div className="project__date">
                    {props.project.dueDate}
                </div>
            </div>
        </div>
        {props.project.subtasks && (
            <div
                className="project__progress"
                value={props.project.subtasks.complete}
                max={props.project.subtasks.total}
            >
                <div
                    className="project__progress__bar"
                    style={{
                        width: `${(props.project.subtasks.complete /
                            props.project.subtasks.total) *
                            100}%`
                    }}
                ></div>
                <div className="project__progress__container">
                    <div className="project__progress__info">
                        <strong>{props.project.subtasks.complete}</strong>{" "}
                        of <strong>{props.project.subtasks.total}</strong>{" "}
                        subtasks complete
                    </div>
                    <div className="project__progress__update">
                        Update status
                    </div>
                </div>
            </div>
        )}
    </div>
);

const getProject = (projects, id) => {
    console.log(projects, id)
    return projects.find(project => project.id === id);
};

const mapStateToProps = (state, ownProps) => {
    return {
        project: getProject(state.projects, ownProps.match.params.projectid)
    };
};

export default connect(mapStateToProps)(project);
