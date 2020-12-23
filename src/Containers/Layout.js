import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "../Components/Project/ProjectList";
import SideMenu from "../Components/Navigation/SideMenu";
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from "./Project";
import CreateBand from "../Components/Band/CreateBand";
import Account from "../Components/User/Account";
import Auth from "./Auth";
import Modal from "../Components/Modal/Modal";
import Form from "../Components/Form/Form";
import ProjectArchive from "../Components/Project/ProjectArchive"
import BandProjects from "../Components/Band/BandProjects"
import ManageBand from "../Components/Band/ManageBand"

import * as actions from "../store/actions/index";
import urls from "../shared/urls";
import {objectStatus} from "../shared/strings"
import {objectCollectionToArray} from "../shared/utility"

class Layout extends Component {
    state = {
        sideMenuOpen: false,
        newProjectOpen: false,
    };

    componentDidUpdate(prevProps) {
        // On auth state change
        if (this.props.userId !== prevProps.userId) {
            this.props.fetchProjects(this.props.userId);
            this.props.fetchTasks(this.props.userId);
        }
        // On user object change
        if (this.props.userBands !== prevProps.userBands) {
            const bands = this.props.userBands ? Object.keys(this.props.userBands) : [];
            this.props.fetchBands(bands);
            bands.forEach(bandKey => {
                this.props.fetchProjects(bandKey);
            })
        }
    } 

    handleMenuToggle = () => {
        this.setState((prevState) => ({
            sideMenuOpen: !prevState.sideMenuOpen,
        }));
    };
    handleNewProjectToggle = () => {
        this.setState((prevState) => ({
            newProjectOpen: !prevState.newProjectOpen,
        }));
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        const form = {
            title: event.target.elements["title"].value,
            desc: event.target.elements["description"].value,
            dueDate: event.target.elements["due-date"].value,
            locationId: event.target.elements["location"].value
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            userId: this.props.userId,
            status: objectStatus.pending,
            createdOn: new Date().toString(),
            createdBy: this.props.userId,
            locationId: form.locationId
        };
        this.props.createNewProject(project, form.locationId);
        this.setState({ newProjectOpen: false });
    };
    render() {
        let bandSelectOptions = [];
        for (const [key, value] of Object.entries(this.props.bands)) {
            bandSelectOptions.push({value: key, content: value.bandName})
        }

        return (
            <>
                <Topnav
                    heading={"Bandapp"}
                    toggle={this.handleMenuToggle}
                    isAuth={this.props.userId}
                />
                <SideMenu
                    toggle={this.handleMenuToggle}
                    active={this.state.sideMenuOpen}
                    projects={Object.values(this.props.projects).filter(p => p.status === objectStatus.pending).length}
                    bands={objectCollectionToArray(this.props.bands)}
                />
                {this.props.loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>
                        <main className="container">
                            <Switch>
                                <Route
                                    path={urls.auth}
                                    exact
                                    component={Auth}
                                />
                                {this.props.userId ? (
                                    <>
                                        <Route
                                            path={urls.account}
                                            exact
                                            component={Account}
                                        />
                                        <Route
                                            path={urls.project}
                                            component={Project}
                                        />
                                        <Route
                                            path={urls.manageBand}
                                            component={ManageBand}
                                        />
                                        <Route
                                            path={urls.band}
                                            component={BandProjects}
                                            exact
                                        />
                                        <Route
                                            path={urls.createBand}
                                            component={CreateBand}
                                            exact
                                        />
                                        <Route
                                            path={urls.archive}
                                            exact
                                        >
                                            <ProjectArchive heading="Project archive" />
                                        </Route>
                                        <Route
                                            path={urls.projects}
                                            exact
                                        >
                                            <ProjectList filterType="status" filterValue={objectStatus.pending} />
                                        </Route>
                                    </>
                                ) : (
                                    <Redirect to={urls.auth} />
                                )}
                                <Redirect to={urls.projects} />
                            </Switch>
                        </main>
                        
                        <Modal
                            toggle={this.handleNewProjectToggle}
                            active={this.state.newProjectOpen}
                        >
                            <div className="heading">Create project</div>
                            <Form
                                submit={this.handleFormSubmit}
                                heading="Create project"
                                inputs={[
                                    {
                                        title: "Title",
                                        placeholder: "Project title",
                                        required: true,
                                    },
                                    {
                                        title: "Description",
                                        type: "textarea",
                                        placeholder: "Project description",
                                    },
                                    {
                                        title: "Due date",
                                        type: "date",
                                    },
                                    {
                                        title: "Location",
                                        type: "select",
                                        options: [
                                            {value: this.props.userId, content: 'My projects'},
                                            ...bandSelectOptions
                                        ]
                                    }
                                ]}
                            />
                        </Modal>
                    </>
                )}
                <Thumbnav
                    newProjectOpen={this.handleNewProjectToggle}
                    isAuth={this.props.userId}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        loading: state.projects.loading,
        userId: state.auth.userId,
        username: state.user.user.username,
        userBands: state.user.user.bands,
        bands: state.band.bands,
        test: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (userId) => dispatch(actions.fetchProjects(userId)),
        fetchTasks: (userId) => dispatch(actions.fetchTasks(userId)),
        fetchBands: (bandIds) => dispatch(actions.fetchBands(bandIds)),
        createNewProject: (payload, userId) =>
            dispatch(actions.createNewProject(payload, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
