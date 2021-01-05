import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Account extends Component {
    
    render() {
        return (
            <>
                <h1 className="heading heading--h1">Account</h1>
                <div>User name: {this.props.username}</div>
                <div>Email: {this.props.email}</div>

                <button className="button" onClick={this.props.handleSignOut}>Sign out</button>
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        username: state.user.user.username,
        email: state.auth.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => dispatch(actions.authSignOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
