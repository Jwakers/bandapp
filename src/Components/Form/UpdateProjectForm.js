import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { objectStatus } from "../../shared/strings";
import { objectsToArray } from "../../shared/utility";

const UpdateProjectForm = (props) => {
    const [formState, setFormState] = useState({
        title: props.project.heading,
        description: props.project.description,
        dueDate: props.project.dueDate,
        bpm: props.project.bpm,
        key: props.project.key,
        location: props.project.locationId
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProjectUpdateSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["dueDate"].value,
            bpm: event.target.elements["bpm"].value,
            key: event.target.elements["key"].value,
            // location: event.target.elements["location"].value,
        };
        console.log(form)
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            bpm: form.bpm,
            key: form.key,
            status: objectStatus.pending,
            // locationId: form.location
        };
        props.updateProject(props.project.locationId, props.projectId, project);
        event.target.reset();
        props.close();
    };

    return (
        <>
            <form className="form" onSubmit={handleProjectUpdateSubmit}>
                <label className="form__label" htmlFor="title">
                    Title
                </label>
                <input
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="title"
                    required
                    value={formState.title}
                />

                <label className="form__label" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="description"
                    value={formState.description}
                ></textarea>

                <label className="form__label" htmlFor="dueDate">
                    Due date
                </label>
                <input
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="date"
                    name="dueDate"
                    value={formState.dueDate}
                />

                <label className="form__label" htmlFor="bpm">
                    BPM
                </label>
                <input
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="bpm"
                    value={formState.bpm}
                />

                <label className="form__label" htmlFor="key">
                    Key
                </label>
                {/* <select
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="key"
                    value={formState.key}
                >
                    <option value=""></option>
                    <option value="Key of C">Key of C</option>
                    <option value="Key of Db / C#">Key of Db / C#</option>
                    <option value="Key of D">Key of D</option>
                    <option value="Key of Eb">Key of Eb</option>
                    <option value="Key of E">Key of E</option>
                    <option value="Key of F">Key of F</option>
                    <option value="Key of Gb / F#">Key of Gb / F#</option>
                    <option value="Key of G">Key of G</option>
                    <option value="Key of Ab">Key of Ab</option>
                    <option value="Key of A">Key of A</option>
                    <option value="Key of Bb">Key of Bb</option>
                    <option value="Key of B / Cb">Key of B / Cb</option>
                </select>
                <label className="form__label" htmlFor="location">
                    Location
                </label> */}

                <select
                    className="form__input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="location"
                    value={formState.location}
                >
                    <option value={props.userId}>My projects</option>
                    {objectsToArray(props.bands, true).map((band) => (
                        <option value={band.id} key={band.id}>
                            {band.bandName}
                        </option>
                    ))}
                </select>
                <div className="form__control">
                    <button
                        type="button"
                        onClick={props.close}
                        className="form__control__cancel button-subtle button-subtle--warning"
                    >
                        cancel
                    </button>
                    <button
                        type="submit"
                        className="form__control__submit button button--continue"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects.projects[ownProps.projectId],
        bands: state.bands.bands,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (locationId, userId, projectData) =>
            dispatch(actions.updateProject(locationId, userId, projectData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectForm);
