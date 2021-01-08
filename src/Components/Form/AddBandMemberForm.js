import React, { useState } from "react";

const UpdateBandForm = (props) => {
    const [formState, setFormState] = useState({
        username: ''
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
                name="username"
                placeholder="Members username"
                onChange={e => handleChange(e)}
                value={formState.username}
            />
            <button className="button" type="submit">
                Submit
            </button>
        </form>
    );
};

export default UpdateBandForm;
