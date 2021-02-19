import firebase from "../../firebase";
import "firebase/database";
import "firebase/storage";

import { addDatabaseListener, removeDatabaseListener } from "./utility";
import * as actionTypes from "./actionTypes";

export const bandStart = () => {
    return {
        type: actionTypes.BAND_START,
    };
};

export const bandSuccess = (band) => {
    return {
        type: actionTypes.BAND_SUCCESS,
        band: band,
    };
};

export const bandFail = (error) => {
    return {
        type: actionTypes.BAND_FAIL,
        error,
    };
};

export const fetchBands = (bandIds) => {
    return (dispatch) => {
        if (!bandIds.length) return;
        dispatch(bandStart());
        bandIds.forEach((key) => {
            const ref = firebase.database().ref(`bands/${key}`);
            ref.on(
                "value",
                (snap) => {
                    dispatch(bandSuccess({ [key]: snap.val() }));
                    dispatch(addDatabaseListener(`bands/${key}`));
                },
                (error) => {
                    dispatch(bandFail(error.message));
                    console.log("Bands listener removed", error.message);
                    dispatch(removeDatabaseListener(`bands/${key}`));
                    ref.off();
                }
            );
        });
    };
};

export const updateBandInfo = (bandId, bandData) => {
    return () => {
        firebase.database().ref(`bands/${bandId}`).update(bandData);
    };
};

export const addBandMember = (bandId, email) => {
    return (dispatch) => {
        firebase
            .database()
            .ref(`users`)
            .orderByChild("email")
            .equalTo(email)
            .once("value")
            .then((snap) => {
                const user = snap.val() ? snap.val()[Object.keys(snap.val())[0]] : false;
                console.log(user);
                if (user) {
                    // User exists
                    firebase
                        .database()
                        .ref(`bands/${bandId}/members/${user.userId}`)
                        // Should be set to 'true' and user info should be fetched from band page.
                        // Temporarily set to username to reflect what should be show.
                        .set(user.username)
                        .catch((error) => console.log(error));
                    dispatch(addBandToUser(user.userId, bandId));
                } else {
                    // User does not exist / other error
                    dispatch(bandFail(`User does not exist`));
                }
            })
            .catch((error) => {
                console.log(error);
                return dispatch(bandFail(error.message));
            });
        // firebase
        //     .auth()
        //     .fetchSignInMethodsForEmail(email)
        //     .then((response) => {
        //         console.log("USER:", response);
        //         if (response.length) {
        //             // user exists
        //             firebase
        //                 .database()
        //                 .ref(`bands/${bandId}/members/${userId}`)
        //                 .set(email)
        //                 .catch((error) => console.log(error));
        //             // Add band to user information
        //             dispatch(addBandToUser(userId, bandId));
        //         } else {
        //             // user does not exist
        //             dispatch(bandFail(`User does not exist`));
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         dispatch(bandFail(`${error.message}`));
        //     });

        // firebase
        //     .database()
        //     .ref(`usernames/${username}`)
        //     .once("value")
        //     .then((snapshot) => {
        //         const userId = snapshot.val();
        //         if (userId === null)
        //             return dispatch(bandFail("User does not exist"));

        //         firebase
        //             .database()
        //             .ref(`bands/${bandId}/members/${userId}`)
        //             .set(username)
        //             .catch((error) => console.log(error));

        //         dispatch(addBandToUser(userId, bandId))
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         dispatch(bandFail(error.message));
        //     });
    };
};

export const removeBandMember = (bandId, userId) => {
    return () => {
        firebase.database().ref(`bands/${bandId}/members/${userId}`).remove();
        firebase.database().ref(`users/${userId}/bands/${bandId}`).remove();
    };
};

export const addBandToUser = (userId, bandId) => {
    return () => {
        firebase
            .database()
            .ref(`users/${userId}/bands/${bandId}`)
            .set(true)
            .catch((error) => console.log(error));
    };
};

export const uploadBandProfileImage = (bandId, image) => {
    return (dispatch) => {
        const pathRef = `images/bands/${bandId}`;
        firebase
            .storage()
            .ref(pathRef)
            .put(image)
            .then((res) => {
                dispatch(setBandProfileImage(bandId, pathRef));
            })
            .catch((err) => {
                console.dir(err);
            });
    };
};

export const setBandProfileImage = (bandId, imagePath) => {
    return () => {
        firebase
            .storage()
            .ref(imagePath)
            .getDownloadURL()
            .then((url) => {
                firebase
                    .database()
                    .ref(`bands/${bandId}`)
                    .update({ bandImage: url })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };
};

export const createNewBand = (bandData, userId, username) => {
    bandData.members = { [userId]: username };
    bandData.owner = userId;
    return (dispatch) => {
        firebase
            .database()
            .ref(`bands`)
            .push(bandData)
            .then((snap) => {
                dispatch(addBandToUser(userId, snap.key));
            })
            .catch((error) => console.log(error));
    };
};
