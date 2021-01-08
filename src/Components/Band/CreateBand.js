import React from "react";
import { connect } from "react-redux";

import CreateBandForm from "../Form/CreateBandForm";

import urls from "../../shared/urls";

import * as actions from "../../store/actions/index";

const CreateBand = (props) => {
    const createNewBand = (event) => {
        event.preventDefault();
        const form = {
            bandName: event.target.elements["bandName"].value,
            bio: event.target.elements["bio"].value,
        };
        props.createNewBand(form, props.userId, props.username);
        props.history.push(urls.projects);
    };

    return (
        <>
            <h1 className="heading heading--h1">Create a Band</h1>

            <CreateBandForm onSubmit={createNewBand} close={props.close} />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        username: state.user.user.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewBand: (bandData, userId, username) =>
            dispatch(actions.createNewBand(bandData, userId, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBand);
