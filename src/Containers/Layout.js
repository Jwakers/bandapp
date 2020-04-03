import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Topnav from "../Components/Navigation/Topnav";
import ProjectList from "./ProjectList";
import SideMenu from '../Components/Navigation/SideMenu'
import Thumbnav from "../Components/Navigation/Thumbnav";
import Project from '../Components/Project'

class Layout extends Component {
    state = {
        sideMenuOpen: false
    }
    handleMenuToggle = () => {
        this.setState(prevState => ({sideMenuOpen: !prevState.sideMenuOpen}))
    }
    render() {
        return (
            <>
                <Topnav heading="Bandapp" toggle={this.handleMenuToggle} />
                <SideMenu toggle={this.handleMenuToggle} active={this.state.sideMenuOpen} projects={this.props.projectIndex} />
                <main className="container">
                    <Switch>
                        <Route path="/:projectid" component={Project} />
                        <Route path="/" exact component={ProjectList} />
                    </Switch>
                </main>
                <Thumbnav newProjectOpen={this.handleNewProjectOpen} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectIndex: state.projects.length
    }
}

export default connect(mapStateToProps)(Layout);
