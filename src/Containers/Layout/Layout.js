import React, { Component } from 'react'

import Topnav from '../../Components/Navigation/Topnav/Topnav'
import Bottomnav from '../../Components/Navigation/Bottomnav/Bottomnav'
import Projects from '../Projects/Projects'

class Layout extends Component {
    state = {
        projects: null
    }
    render() {
        return (
            <>
                <Topnav heading="Bandapp" />

                <Projects />

                <Bottomnav />
            </>
        )
    }
}

export default Layout