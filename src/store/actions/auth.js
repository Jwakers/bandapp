import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/auth";

import { fetchUser, setUserData, setUsername } from "./user";
import { removeAllDatabaseListeners } from "./utility"
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};


export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authAutoSignIn = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(authSuccess(user.uid, user.email));
                dispatch(fetchUser(user.uid));
            }
        });
    };
};

export const authSignOut = (databaseListeners) => {
    return (dispatch) => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Signed out");
                dispatch(removeAllDatabaseListeners(databaseListeners))
                dispatch(authLogout())
            })
            .catch((error) => {
                console.log(error);
            });
        
    }
};

export const authSignUp = (email, password, username) => {
    return (dispatch) => {
        dispatch(authStart());
        // Check if username exists
        username = username.toLowerCase();
        firebase
            .database()
            .ref(`usernames/${username}`)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() !== null) {
                    return dispatch(authFail("Username already exists"));
                } else {
                    // Authorize user
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then((user) => {
                            // User signed in
                            const userData = {
                                username: username,
                                userId: user.user.uid
                            };

                            dispatch(setUserData(userData));
                            dispatch(
                                setUsername(userData.username, userData.userId)
                            );
                        })
                        .catch((error) => {
                            console.error(error.message);
                            dispatch(authFail(error.message));
                        });
                }
            })
            .catch((error) => {
                console.log(error);
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
