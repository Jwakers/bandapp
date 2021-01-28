import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SignInForm from "../Components/Form/SignInForm";
import SignUpForm from "../Components/Form/SignUpForm";

import * as actions from "../store/actions/index";

import urls from "../shared/urls"

export class Auth extends PureComponent {
    state = {
        isSignUp: false,
    };
    handleAuthFormSubmit(event) {
        event.preventDefault();
        const form = {
            email: event.target.elements["email"].value,
            password: event.target.elements["password"].value
        };
        this.state.isSignUp
            ? this.props.onSignUp(form.email, form.password, event.target.elements["username"].value)
            : this.props.onSignIn(form.email, form.password);
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
        if (this.props.userId) return <Redirect to={urls.projects} />;
        if (this.props.loading) return <div className="spinner"></div>;
        return (
            <>
                <div className="heading heading--h1 capitalize">
                    {this.getMethodText()}
                </div>
                <div className="message message--error">{this.props.error}</div>
                {this.state.isSignUp ? (
                    <SignUpForm submit={this.handleAuthFormSubmit.bind(this)} />
                ) : (
                    <SignInForm submit={this.handleAuthFormSubmit.bind(this)} />
                )}
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
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (email, password) =>
            dispatch(actions.authSignIn(email, password)),
        onSignUp: (email, password, username) =>
            dispatch(actions.authSignUp(email, password, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
