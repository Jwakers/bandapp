import React, { useState } from "react";

const UpdateBandForm = (props) => {
    const [formState, setFormState] = useState({
        email: ''
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
            <input
                className="form__input"
                type="text"
                name="email"
                placeholder="Member's email address"
                onChange={e => handleChange(e)}
                value={formState.email}
            />
            <button className="button" type="submit">
                Submit
            </button>
        </form>
    );
};

export default UpdateBandForm;
