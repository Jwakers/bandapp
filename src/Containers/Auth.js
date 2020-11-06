import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../store/actions/index";

import Form from "../Components/Form/Form";

class Auth extends Component {
    state = {
        isSignUp: false,
    };
    handleAuthFormSubmit(event) {
        event.preventDefault();
        const form = {
            email: event.target.elements["email-address"].value,
            password: event.target.elements["password"].value,
        };
        this.props.onAuth(form.email, form.password, this.state.isSignUp);
    }
    handleFormState() {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    }
    getMethodText(reverse) {
        let signUp = this.state.isSignUp;
        if (reverse) signUp = !signUp;
        return signUp ? "Sign up" : "Sign in";
    }
    render() {
        if (this.props.auth.token) return <Redirect to="/" />
        if (this.props.auth.loading) return <div className="spinner"></div>;
        return (
            <>
                <div className="heading heading--h1">
                    {this.getMethodText()}
                </div>
                <div className="message message--error">
                    {this.props.auth.error}
                </div>
                <Form
                    submit={this.handleAuthFormSubmit.bind(this)}
                    buttonText={this.getMethodText()}
                    inputs={[
                        {
                            title: "Email address",
                            placeholder: "Email address",
                            required: true,
                        },
                        {
                            title: "Password",
                            type: "password",
                            placeholder: "Password",
                            required: true,
                        },
                    ]}
                />
                <button
                    className="button"
                    onClick={this.handleFormState.bind(this)}
                >
                    Switch to {this.getMethodText(true)}
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
