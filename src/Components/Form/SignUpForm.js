import React, { useState } from "react";

const SignUpForm = (props) => {

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
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
        <>
            <form className="form" onSubmit={props.submit}>
                <label className="form__label" htmlFor="email address">User name</label>
                <input className="form__input" onChange={e => handleChange(e)} type="text" placeholder="User name" name="username" required autoComplete="on" value={formState.username} />
                <label className="form__label" htmlFor="email">Email address</label>
                <input className="form__input" onChange={e => handleChange(e)} type="text" placeholder="Email address" name="email" required autoComplete="on" value={formState.email} />
                <label className="form__label" htmlFor="password">Password</label>
                <input className="form__input" onChange={e => handleChange(e)} type="password" placeholder="Password" name="password" required autoComplete="on" value={formState.password} />
                <div className="form__control">
                    <button type="button" onClick={props.close} className="form__control__cancel button-subtle button-subtle--warning">cancel</button>
                    <button type="submit" className="form__control__submit button button--continue">Sign up</button>
                </div>
            </form>
        </>
    );
};

export default SignUpForm;
