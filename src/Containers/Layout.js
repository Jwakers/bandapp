import React, { Component } from 'react'

import Topnav from '../Components/Navigation/Topnav'
import Thumbnav from '../Components/Navigation/Thumbnav'
import Projects from './Projects'
import NewProject from '../Components/NewProject'

class Layout extends Component {
    state = {
        projects: null,
        newProjectOpen: true
    }

    handleNewProjectOpen = () => {
        this.setState({newProjectOpen: true})
    }
    handleNewProjectClose = () => {
        this.setState({newProjectOpen: false})
    }
    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log(this)
    }

    render() {
        return (
            <>
                <Topnav heading="Bandapp" />

                <Projects />

                <NewProject submit={event => this.handleFormSubmit(event)} active={this.state.newProjectOpen} close={this.handleNewProjectClose} />

                <Thumbnav newProjectOpen={this.handleNewProjectOpen}  />
            </>
        )
    }
}

export default Layout