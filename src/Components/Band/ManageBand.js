import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";

import * as actions from "../../store/actions";

class ManageBand extends Component {
    state = {
        showBandUpdateModal: false,
        isBandOwner: this.props.band.owner === this.props.userId,
        bandNameInput: this.props.band.bandName,
        bandBioInput: this.props.band.bio,
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.bandid !== prevProps.match.params.bandid) {
            console.log(this.props.band.bandName)
            this.setState(({
                ...this.state,
                bandNameInput: this.props.band.bandName,
                bandBioInput: this.props.band.bio
            }))
            console.log(this.state)
        }
    }


    toggleBandUpdateForm = () => {
        this.setState(prev => ({
            showBandUpdateModal: !prev.showBandUpdateModal,
        }));
    };

    handleBandUpdateSubmit = (event) => {
        event.preventDefault();
        const bandData = {
            bandName: this.state.bandNameInput,
            bio: this.state.bandBioInput,
        };
        this.props.updateBandInfo(this.props.match.params.bandid, bandData)
        this.toggleBandUpdateForm()
    };

    handleInputOnChange = (event, stateProp) => {
        this.setState({
            [stateProp]: event.target.value,
        });
    };

    handleAddBandMemberSubmit = (event) => {
        event.preventDefault();
        const input = event.target.elements["members-username"];
        const username = input.value;
        this.props.addBandMember(
            this.props.match.params.bandid,
            username.toLowerCase()
        );
        input.value = "";
    };

    removeBandMember = (memberId) => {
        this.props.removeBandMember(this.props.match.params.bandid, memberId);
    };

    getMemberListItem = (member) => {
        const [id, username] = [...member];
        const button = (
            <button
                onClick={this.props.removeBandMember.bind(this, id)}
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
                {this.props.error ? this.props.error : null}
                <div>
                    <strong>Bio</strong> [update button]
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
                        <form
                            className="form"
                            onSubmit={this.handleAddBandMemberSubmit}
                        >
                            <input
                                className="form__input"
                                type="text"
                                name="members-username"
                                placeholder="Members username"
                            />
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </form>
                        <Modal
                            toggle={this.toggleBandUpdateForm}
                            active={this.state.showBandUpdateModal}
                        >
                            <form
                                className="form"
                                onSubmit={this.handleBandUpdateSubmit}
                            >
                                <input
                                    className="form__input"
                                    type="text"
                                    name="band-name"
                                    onChange={e => this.handleInputOnChange(e, 'bandNameInput')}
                                    value={this.state.bandNameInput}
                                />
                                <textarea
                                    className="form__input"
                                    name="band-bio"
                                    onChange={e => this.handleInputOnChange(e, 'bandBioInput')}
                                    value={this.state.bandBioInput}
                                ></textarea>
                                <div className="form__control">
                                    <button
                                        type="button"
                                        onClick={this.toggleBandUpdateForm}
                                        className="form__control__cancel button-subtle button-subtle--warning"
                                    >
                                        cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="form__control__submit button button--continue"
                                    >
                                        update
                                    </button>
                                </div>
                            </form>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBand);
