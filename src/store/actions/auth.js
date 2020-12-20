import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/auth";

import {fetchUser} from "./user";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const authAutoSignIn = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(authSuccess(user.uid, user.email))
                dispatch(fetchUser(user.uid))
            }
        });
    };
};

export const authSignOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("Signed out");
        })
        .catch((error) => {
            console.log(error);
        });
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authSignUp = (email, password, userName) => {
    return (dispatch) => {
        dispatch(authStart());
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // User signed in
                var userData = {
                    userName: userName,
                    userId: user.user.uid,
                    email: user.user.email,
                };
                firebase
                    .database()
                    .ref("users/" + userData.userId)
                    .set(userData)
                    .catch((error) => {
                        console.log(error.message);
                    });
                dispatch(authSuccess(user.user.uid));
                dispatch(fetchUser(user.uid));
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
                dispatch(authFail(error.message));
            });
    };
};

export const authSignIn = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        console.log(user.user)
                        dispatch(authSuccess(user.user.uid, user.user.email));
                        dispatch(fetchUser(user.uid));
                    })
                    .catch((error) => {
                        console.error(error.code);
                        console.error(error.message);
                        dispatch(authFail(error.message));
                    });
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
            });
    };
};
