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
        this.state.isSignUp
            ? this.props.onSignUp(form.email, form.password)
            : this.props.onSignIn(form.email, form.password);
        // this.props.onAuth(form.email, form.password, this.state.isSignUp);
    }
    handleFormState() {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    }
    getMethodText(reverse) {
        let signUp = this.state.isSignUp;
        if (reverse) signUp = !signUp;
        return signUp ? "sign up" : "sign in";
    }
    render() {
        if (this.props.userId) return <Redirect to="/" />;
        if (this.props.loading) return <div className="spinner"></div>;
        return (
            <>
                <div className="heading heading--h1 capitalize">
                    {this.getMethodText()}
                </div>
                <div className="message message--error">
                    {this.props.error}
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
                    className="button-subtle"
                    onClick={this.handleFormState.bind(this)}
                >
                    switch to {this.getMethodText(true)}
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onAuth: (email, password, isSignUp) =>
        //     dispatch(actions.auth(email, password, isSignUp)),
        onSignIn: (email, password) =>
            dispatch(actions.authSignIn(email, password)),
        onSignUp: (email, password) =>
            dispatch(actions.authSignUp(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
