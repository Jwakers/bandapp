import React from "react";
import Modal from "../Modal/Modal";

// TODO: create modal as higher order component with backdrop component

const newProject = props => {
    return (
        <Modal open={props.active} close={props.close} active={props.active} theme="dark">
            <div className="heading heading--h1">Create new project</div>
            <form onSubmit={props.submit} className="form" action="">
                <label className="form__label" htmlFor="title">
                    Title
                </label>
                <input
                    className="form__input"
                    type="text"
                    placeholder="Project title"
                    name="title"
                    required
                />
                <label className="form__label" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="form__input form__input--textarea"
                    placeholder="Description"
                    name="description"
                ></textarea>
                <label className="form__label" htmlFor="due-date">
                    Due date
                </label>
                <input
                    className="form__input"
                    type="date"
                    placeholder="Due date"
                    name="due-date"
                />
                <div className="form__control">
                    <button type="button" onClick={props.close} className="form__control__cancel button-subtle button-subtle--warning">
                        cancel
                    </button>
                    <button type="submit" className="form__control__submit button button--continue">
                        create
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default newProject;
