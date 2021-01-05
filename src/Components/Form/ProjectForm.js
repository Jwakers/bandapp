import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"

import Form from "./Form";

import { objectStatus } from "../../shared/strings"

const projectForm = (props) => {
    const handleProjectUpdateSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
            bpm: event.target.elements["bpm"].value,
            key: event.target.elements["key"].value,
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            bpm: form.bpm,
            key: form.key,
            status: objectStatus.pending,
        };
        props.updateProject(
            props.project.locationId,
            props.projectId,
            project
        );
        event.target.reset();
        props.close();
    };

    return (
        <>
            <div className="heading heading--h2">
                {"Edit " + props.project.heading}
            </div>
            <Form
                submit={handleProjectUpdateSubmit}
                buttonText="update"
                close={props.close}
                inputs={[
                    {
                        title: "Title",
                        value: props.project.heading,
                    },
                    {
                        title: "Description",
                        type: "textarea",
                        value: props.project.description,
                    },
                    {
                        title: "Due date",
                        type: "date",
                        value: props.project.dueDate,
                    },
                    {
                        title: "BPM",
                        type: "number",
                        value: props.project.bpm,
                    },
                    {
                        title: "Key",
                        type: "select",
                        options: [
                            { value: "", content: "" },
                            { value: "Key of C", content: "Key of C" },
                            {
                                value: "Key of Db / C#",
                                content: "Key of Db / C#",
                            },
                            { value: "Key of D", content: "Key of D" },
                            {
                                value: "Key of Eb",
                                content: "Key of Eb",
                            },
                            { value: "Key of E", content: "Key of E" },
                            { value: "Key of F", content: "Key of F" },
                            {
                                value: "Key of Gb / F#",
                                content: "Key of Gb / F#",
                            },
                            { value: "Key of G", content: "Key of G" },
                            {
                                value: "Key of Ab",
                                content: "Key of Ab",
                            },
                            { value: "Key of A", content: "Key of A" },
                            {
                                value: "Key of Bb",
                                content: "Key of Bb",
                            },
                            {
                                value: "Key of B / Cb",
                                content: "Key of B / Cb",
                            },
                        ],
                        value: props.project.key,
                    },
                ]}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects.projects[ownProps.projectId],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (locationId, userId, projectData) =>
            dispatch(actions.updateProject(locationId, userId, projectData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(projectForm);
