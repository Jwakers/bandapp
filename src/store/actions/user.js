import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

import * as actionTypes from "./actionTypes";

export const userStart = () => {
    return {
        type: actionTypes.USER_START,
    };
};

export const userSuccess = (user) => {
    return {
        type: actionTypes.USER_SUCCESS,
        user,
    };
};

export const userFail = (error) => {
    return {
        type: actionTypes.USER_FAIL,
        error,
    };
};

export const setUserData = (userData) => {
    return (dispatch) => {
        firebase
            .database()
            .ref(`users/${userData.userId}`)
            .set(userData)
            .then(() => {
                dispatch(fetchUser(userData.userId));
            })
            .catch((error) => {
                return console.log(error.message);
            });
    };
};

export const setUsername = (username, userId) => {
    return () => {
        firebase
            .database()
            .ref(`usernames`)
            .set({ [username]: userId })
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };
};

export const uploadUserProfileImage = (userId, image) => {
    return (dispatch) => {
        const pathRef = `images/profiles/${userId}`;
        firebase
            .storage()
            .ref(pathRef)
            .put(image)
            .then((res) => {
                console.dir(res);
                dispatch(setUserProfileImage(userId, pathRef))
            })
            .catch((err) => {
                console.dir(err);
            });
    };
};

export const setUserProfileImage = (userId, imagePath) => {
    return () => {
        firebase.storage().ref(imagePath).getDownloadURL().then(url => {
            console.log(url)
            firebase
                .database()
                .ref(`users/${userId}`).update({profileImage: url}).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
}

export const fetchUser = (userId) => {
    return (dispatch) => {
        dispatch(userStart());
        firebase
            .database()
            .ref(`users/${userId}`)
            .on(
                "value",
                (snap) => {
                    dispatch(userSuccess(snap.val()));
                },
                (error) => {
                    dispatch(userFail(error.message));
                }
            );
    };
};

export function updateUser(userId, userData) {
    return () => {
        firebase.database().ref(`users/${userId}`).update(userData);
    };
}
