import React, { useState } from "react";

const CreateTaskForm = (props) => {

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        dueDate: ''
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
                Title
            </label>
            <input
                className="form__input"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Title"
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
                placeholder="Task description"
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
                    Add task
                </button>
            </div>
        </form>
    );
};

export default CreateTaskForm;