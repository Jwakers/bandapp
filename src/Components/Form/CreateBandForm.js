import React, { useState } from "react";

const CreateBandForm = (props) => {

    const [formState, setFormState] = useState({
        bandName: undefined,
        bio: undefined
    })

    const handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form className="form" onSubmit={props.onSubmit}>
            <label className="form__label" htmlFor="bandName">
                Band name
            </label>
            <input
                className="form__input"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="band name"
                name="bandName"
                required
                value={formState.name}
            />
            <label className="form__label" htmlFor="bio">
                About your band (optional)
            </label>
            <textarea
                className="form__input"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Bio"
                name="bio"
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
                    Create band
                </button>
            </div>
        </form>
    );
};

export default CreateBandForm;