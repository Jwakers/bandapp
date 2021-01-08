import React, { useState } from "react";

const UpdateBandForm = (props) => {
    const [formState, setFormState] = useState({
        bandName: props.band.bandName,
        bio: props.band.bio,
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

    return (
        <form className="form" onSubmit={props.onSubmit}>
            <h2 className="heading heading--h2">
                Update {props.band.bandName} bands information
            </h2>
            <input
                className="form__input"
                type="text"
                name="bandName"
                onChange={(e) => handleChange(e)}
                value={formState.bandName}
            />
            <textarea
                className="form__input"
                name="bio"
                onChange={(e) => handleChange(e)}
                value={formState.bio}
            ></textarea>
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
                    update
                </button>
            </div>
        </form>
    );
};

export default UpdateBandForm;
