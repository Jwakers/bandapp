import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateProfileImage from '../Components/Form/UpdateProfileImage';

import * as actions from "../store/actions/index";

class Account extends Component {
    handleProfileImage(event) {
        event.preventDefault()
        const file = event.target.elements["profile-image"].files[0];
        console.dir(file);
        this.props.handleImageUpload(this.props.userId, file)
    }

    render() {
        return (
            <>
                <h1 className="heading heading--h1">Account</h1>
                <div><img className="profile-image" src={this.props.profileImage} alt=""/></div>
                <div>User name: {this.props.username}</div>
                <div>Email: {this.props.email}</div>
                <div>
                    <UpdateProfileImage onSubmit={e => this.handleProfileImage(e)} />
                </div>

                <button className="button" onClick={this.props.handleSignOut.bind(this, this.props.dbList)}>
                    Sign out
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        userId: state.auth.userId,
        username: state.user.user.username,
        profileImage: state.user.user.profileImage,
        email: state.auth.email,
        dbList: state.databaseListeners
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: (databaseListeners) => dispatch(actions.authSignOut(databaseListeners)),
        handleImageUpload: (userId, image) => dispatch(actions.uploadUserProfileImage(userId, image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
