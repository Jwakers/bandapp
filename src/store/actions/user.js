import firebase from "../../firebase";
import "firebase/database";
import "firebase/storage";

import { addDatabaseListener, removeDatabaseListener } from "./utility"
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

export const setUserData = (userId, userData) => {
    return (dispatch) => {
        firebase
            .database()
            .ref(`users/${userId}`)
            .set(userData)
            .then(() => {
                dispatch(fetchUser(userId));
            })
            .catch((error) => {
                return console.log(error.message);
            });
    };
};

// export const setUsername = (username, userId) => {
//     return () => {
//         firebase
//             .database()
//             .ref(`usernames`)
//             .set({ [username]: userId })
//             .then(() => {})
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
// };

export const uploadUserProfileImage = (userId, image) => {
    return (dispatch) => {
        const pathRef = `images/profiles/${userId}`;
        firebase
            .storage()
            .ref(pathRef)
            .put(image)
            .then((res) => {
                dispatch(setUserProfileImage(userId, pathRef));
            })
            .catch((err) => {
                console.dir(err);
            });
    };
};

export const setUserProfileImage = (userId, imagePath) => {
    return () => {
        firebase
            .storage()
            .ref(imagePath)
            .getDownloadURL()
            .then((url) => {
                firebase
                    .database()
                    .ref(`users/${userId}`)
                    .update({ profileImage: url })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };
};

export const fetchUser = (userId) => {
    return (dispatch) => {
        dispatch(userStart());
        const ref = firebase.database().ref(`users/${userId}`);
        ref.on(
            "value",
            (snap) => {
                dispatch(userSuccess(snap.val()));
                dispatch(addDatabaseListener(`users/${userId}`))
            },
            (error) => {
                dispatch(userFail(error.message));
                console.log("User listener removed", error.message);
                dispatch(removeDatabaseListener(`users/${userId}`))
                ref.off();
            }
        );
    };
};

export function updateUser(userId, userData) {
    return () => {
        firebase.database().ref(`users/${userId}`).update(userData);
    };
}
