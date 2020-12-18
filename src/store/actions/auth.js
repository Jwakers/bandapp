import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/auth";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
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
                dispatch(authSuccess(user.uid))
            }
        });
    };
};

export const logout = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            console.log("Signed out");
        })
        .catch((error) => {
            // An error happened
            console.log(error);
        });
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authSignUp = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // User signed in
                console.dir(user.user.uid);
                var userData = {
                    name: "Jack",
                    phone: "779797329",
                    address: "474 Mercer Drive",
                    uid: user.user.uid,
                    email: user.user.email,
                };
                firebase
                    .database()
                    .ref("users/" + user.uid)
                    .set(userData)
                    .catch((error) => {
                        console.log(error.message);
                    });
                dispatch(authSuccess(user.user.uid));
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
                        dispatch(authSuccess(user.user.uid));
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
