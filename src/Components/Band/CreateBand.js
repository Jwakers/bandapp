import React, { PureComponent } from "react";
import { connect } from "react-redux";

import CreateBandForm from "../Form/CreateBandForm";

import urls from "../../shared/urls";

import * as actions from "../../store/actions/index";

class Band extends PureComponent {
    state = {
        bandName: undefined,
        bio: undefined,
    };

    createNewBand(event) {
        event.preventDefault();
        const form = {
            bandName: event.target.elements["band-name"].value,
            bio: event.target.elements["bio"].value,
        };
        this.props.createNewBand(form, this.props.userId, this.props.username);
        this.props.history.push(urls.projects);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    render() {
        return (
            <>
                <h1 className="heading heading--h1">Create a Band</h1>

                <CreateBandForm onSubmit={this.createNewBand} close={this.props.close} />

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
