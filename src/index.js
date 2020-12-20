import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import firebase from "firebase/app";

import projects from "./store/reducers/projects";
import auth from "./store/reducers/auth";
import tasks from "./store/reducers/tasks";
import user from "./store/reducers/user";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
    apiKey: "AIzaSyCKsBfSIX8H_O7c_5cuOtnoHvdQC65XQtQ",
    authDomain: "bandapp-1ddad.firebaseapp.com",
    databaseURL: "https://bandapp-1ddad.firebaseio.com",
    projectId: "bandapp-1ddad",
    storageBucket: "bandapp-1ddad.appspot.com",
    messagingSenderId: "846292116539",
    appId: "1:846292116539:web:cf04924bcb141cf3a1e81e",
    measurementId: "G-FC0M6BYE62"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    combineReducers({
    projects,
    tasks,
    auth,
    user
}), composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
