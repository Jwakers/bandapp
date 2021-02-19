import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import * as actions from "./store/actions/"

import store from "./store/reducers"

const firebaseConfig = {
    apiKey: "AIzaSyCKsBfSIX8H_O7c_5cuOtnoHvdQC65XQtQ",
    authDomain: "bandapp-1ddad.firebaseapp.com",
    databaseURL: "https://bandapp-1ddad.firebaseio.com",
    projectId: "bandapp-1ddad",
    storageBucket: "gs://bandapp-1ddad.appspot.com/",
    messagingSenderId: "846292116539",
    appId: "1:846292116539:web:cf04924bcb141cf3a1e81e",
    measurementId: "G-FC0M6BYE62",
};

const firebaseUiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: (response) => {
            console.log(response)
            // store.dispatch(actions.authSuccess(response.user.uid, response.user.email))
            if (!response.additionalUserInfo.isNewUser) {
                // Returning user, fetch user information
                console.log('Returning user')
                store.dispatch(actions.fetchUser(response.user.uid))
            } else {
                // New user, set username before redirect
                console.log('New user')
                const userData = {
                    username: response.user.displayName,
                    userId: response.user.uid,
                    email: response.user.email
                }
                store.dispatch(actions.setUserData(userData.userId, userData));
            }
        },
        signInFailure: (response) => {
            console.log('Sign in failed', response)
        }
    },
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

firebase.initializeApp(firebaseConfig);


const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const startFirebaseUI = (elId) => {
    ui.start(elId, firebaseUiConfig);
};

export default firebase;
