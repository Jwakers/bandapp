import React, { useState } from "react";

const EditCommentForm = (props) => {
    const [formState, setFormState] = useState({
        comment: props.comment,
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
                onChange={(e) => handleChange(e)}
                type="text"
                name="comment"
                required
                value={formState.comment}
            />
            <div className="form__control">
                <button
                    type="button"
                    onClick={props.delete}
                    className="form__control__cancel button-subtle button-subtle--warning"
                >
                    delete comment
                </button>
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

export default EditCommentForm;
