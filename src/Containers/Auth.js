import React, { PureComponent } from "react";
import { startFirebaseUI } from "../firebase";

class Auth extends PureComponent {
    componentDidMount() {
        startFirebaseUI("#firebaseui-auth-container");
    }
    render() {
        return <div id="firebaseui-auth-container"></div>;
    }
}

export default Auth;
