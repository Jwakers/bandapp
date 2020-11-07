import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import "./assets/style/style.scss";
import Layout from "./Containers/Layout";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
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
        onTryAutoSignIn: () => dispatch(actions.authCheckState()),
    };
};

export default connect(null, mapDispatchToProps)(App);
