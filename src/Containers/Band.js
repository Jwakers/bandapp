import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Modal from "../Components/Modal/Modal";
import UpdateBandForm from "../Components/Form/UpdateBandForm";
import UpdateBandImageForm from "../Components/Form/UpdateBandImageForm";
import AddBandMemberForm from "../Components/Form/AddBandMemberForm";

import * as actions from "../store/actions";

class Band extends PureComponent {
    state = {
        showBandUpdateModal: false,
        isBandOwner: this.props.band.owner === this.props.userId
    };

    toggleBandUpdateForm = () => {
        this.setState((prev) => ({
            showBandUpdateModal: !prev.showBandUpdateModal,
        }));
    };

    handleBandUpdateSubmit = (event) => {
        event.preventDefault();
        const bandData = {
            bandName: event.target.elements['bandName'].value,
            bio: event.target.elements['bio'].value,
        };
        this.props.updateBandInfo(this.props.match.params.bandid, bandData);
        this.toggleBandUpdateForm();
    };

    handleInputOnChange = (event, stateProp) => {
        this.setState({
            [stateProp]: event.target.value,
        });
    };

    handleAddBandMemberSubmit = (event) => {
        event.preventDefault();
        const input = event.target.elements["username"];
        const username = input.value;
        this.props.addBandMember(
            this.props.match.params.bandid,
            username.toLowerCase()
        );
        input.value = "";
    };

    handleUploadBandProfileImage(event) {
        event.preventDefault();
        const file = event.target.elements["bandImage"].files[0];
        this.props.uploadBandProfileImage(this.props.match.params.bandid, file);
    }

    removeBandMember = (memberId) => {
        this.props.removeBandMember(this.props.match.params.bandid, memberId);
    };

    getMemberListItem = (member) => {
        const [id, username] = [...member];
        const button = (
            <button
                onClick={this.removeBandMember.bind(this, id)}
                className="button button--warning"
            >
                remove
            </button>
        );

        return (
            <li key={id}>
                {username}
                {this.state.isBandOwner && id !== this.props.userId && button}
            </li>
        );
    };

    render() {
        return (
            <>
                <h1>{this.props.band.bandName}</h1>
                <div>
                    <img
                        className="band-image"
                        src={this.props.band.bandImage}
                        alt=""
                    />
                </div>
                {this.props.error ? this.props.error : null}
                <div>
                    <strong>Bio</strong>
                </div>
                <p>{this.props.band.bio}</p>
                <div>
                    <strong>Members:</strong>
                </div>
                <ul>
                    {Object.entries(this.props.band.members).map((member) =>
                        this.getMemberListItem(member)
                    )}
                </ul>
                {this.state.isBandOwner && (
                    <>
                        <button
                            className="button"
                            onClick={this.toggleBandUpdateForm}
                        >
                            Update Band Information
                        </button>
                        <h2>Add band members</h2>
                        <AddBandMemberForm onSubmit={this.handleAddBandMemberSubmit} />
                        <div>
                            <h2>Add or Update band image</h2>
                            <UpdateBandImageForm onSubmit={e => this.handleUploadBandProfileImage(e)} />
                        </div>
                        <Modal
                            toggle={this.toggleBandUpdateForm}
                            active={this.state.showBandUpdateModal}
                        >
                            <UpdateBandForm onSubmit={this.handleBandUpdateSubmit} close={this.toggleBandUpdateForm} band={this.props.band} />
                        </Modal>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        band: state.bands.bands[ownProps.match.params.bandid],
        error: state.bands.error,
        userId: state.user.user.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBandMember: (bandId, username) =>
            dispatch(actions.addBandMember(bandId, username)),
        removeBandMember: (bandId, username) =>
            dispatch(actions.removeBandMember(bandId, username)),
        updateBandInfo: (bandId, bandData) =>
            dispatch(actions.updateBandInfo(bandId, bandData)),
        uploadBandProfileImage: (bandId, image) => {
            dispatch(actions.uploadBandProfileImage(bandId, image));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Band);
