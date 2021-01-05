import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../Form/Form";
import urls from "../../shared/urls";

import * as actions from "../../store/actions/index";

class Band extends Component {

    createNewBand(event) {
        event.preventDefault();
        const form = {
            bandName: event.target.elements["band-name"].value,
            bio: event.target.elements["bio"].value
        };
        this.props.createNewBand(form, this.props.userId, this.props.username)
        this.props.history.push(urls.projects);
    }

    render() {
        return (
            <>
                <h1 className="heading heading--h1">Create a Band</h1>
                <Form
                    submit={(event) => this.createNewBand(event)}
                    inputs={[
                        {
                            title: "Band name",
                            placeholder: "Band name",
                            required: true,
                        },
                        {
                            title: "Bio",
                            type: "textarea",
                            placeholder: "Describe your band...",
                        }
                    ]}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        username: state.user.user.username,
        loading: state.bands.loading,
        error: state.bands.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewBand: (bandData, userId, username) =>
            dispatch(actions.createNewBand(bandData, userId, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Band);
