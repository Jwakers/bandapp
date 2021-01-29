import React, { useState } from "react";

const CreateCommentForm = (props) => {

    const [formState, setFormState] = useState({
        comment: ''
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
        <form className="form form--flex" onSubmit={(e) => {
            props.onSubmit(e)
            setFormState({comment: ''})
            }}>
            <input
                className="form__input form__input--grow-1"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Comment..."
                name="comment"
                required
                value={formState.comment}
            />
            <button type="submit" className="button button--send form__input--grow-0">
                <i className="material-icons">send</i>
            </button>
        </form>
    );
};

export default CreateCommentForm;