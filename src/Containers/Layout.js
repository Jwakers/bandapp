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
import CreateProjectForm from "../Components/Form/CreateProjectForm";
import ManageBand from "../Components/Band/ManageBand";

import * as actions from "../store/actions/index";
import urls from "../shared/urls";
import { objectStatus } from "../shared/strings";
import { objectCollectionToArray } from "../shared/utility";

class Layout extends Component {
    state = {
        sideMenuOpen: false,
        newProjectOpen: false,
    };

    componentDidUpdate(prevProps) {
        // On auth state change
        if (this.props.userId !== prevProps.userId) {
            this.props.fetchProjects([this.props.userId]);
            this.props.fetchTasks([this.props.userId]);
        }
        // On user object change
        if (this.props.userBands !== prevProps.userBands) {
            const bandKeys = this.props.userBands
                ? Object.keys(this.props.userBands)
                : [];
            this.props.fetchBands(bandKeys);
            this.props.fetchProjects(bandKeys);
            this.props.fetchTasks(bandKeys);
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
            dueDate: event.target.elements["dueDate"].value,
            locationId: event.target.elements["location"].value,
        };
        const project = {
            heading: form.title,
            description: form.desc,
            dueDate: form.dueDate,
            status: objectStatus.pending,
            createdOn: new Date().toString(),
            createdBy: this.props.userId,
            locationId: form.locationId,
        };
        this.props.createNewProject(project, form.locationId);
        this.setState({ newProjectOpen: false });
    };
    render() {
        let bandSelectOptions = [];
        for (const [key, value] of Object.entries(this.props.bands)) {
            bandSelectOptions.push({ value: key, content: value.bandName });
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
                    projects={
                        Object.values(this.props.projects).filter(
                            (p) => p.status === objectStatus.pending
                        ).length
                    }
                    bands={objectCollectionToArray(this.props.bands)}
                />
                {this.props.loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>
                        <main className="container">
                            {!this.props.userId ? (
                                <>
                                    <Redirect to={urls.auth} />
                                    <Route path={urls.auth} component={Auth} exact />
                                </>
                            ) : (
                            <Switch>
                                <Route path={urls.auth} component={Auth} exact />
                                <Route
                                    path={urls.account}
                                    component={Account}
                                />
                                <Route
                                    path={urls.band}
                                    component={ManageBand}
                                />
                                <Route
                                    path={urls.createBand}
                                    component={CreateBand}
                                />
                                <Route path={urls.projectArchive} exact>
                                    <ProjectList
                                        heading="Project archive"
                                        filterType="status"
                                        filterValue={objectStatus.archived}
                                        canFilter={false}
                                    />
                                </Route>
                                <Route path={urls.projects} exact>
                                    <ProjectList
                                        heading="All projects"
                                        filterType="status"
                                        filterValue={objectStatus.pending}
                                        canFilter
                                    />
                                </Route>
                                <Route
                                    path={urls.project}
                                    component={Project}
                                />
                            </Switch>
                            )}
                        </main>

                        <Modal
                            toggle={this.handleNewProjectToggle}
                            active={this.state.newProjectOpen}
                        >
                            <h2 className="heading heading--h2">Create project</h2>
                            <CreateProjectForm onSubmit={e => this.handleFormSubmit(e)} userId={this.props.userId} bands={bandSelectOptions} />
                            
                        </Modal>
                    </>
                )}
                {this.props.userId && (
                    <Thumbnav
                        newProjectOpen={this.handleNewProjectToggle}
                        toggle={this.handleMenuToggle}
                    />
                )}
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
        bands: state.bands.bands
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (userId) => dispatch(actions.fetchProjects(userId)),
        fetchTasks: (userId) => dispatch(actions.fetchTasks(userId)),
        fetchBands: (bandIds) => dispatch(actions.fetchBands(bandIds)),
        createNewProject: (payload, userId) =>
            dispatch(actions.createNewProject(payload, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
