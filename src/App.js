import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./assets/style/style.scss";
import Layout from "./Containers/Layout";

import * as actions from "./store/actions/index";


class App extends Component {

    componentDidMount() {
        this.props.onAutoSignIn()
    }

    render() {
        return (
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAutoSignIn: () => dispatch(actions.authAutoSignIn())
    };
};

export default connect(null, mapDispatchToProps)(App);
