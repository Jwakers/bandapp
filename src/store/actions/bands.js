import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

import { addDatabaseListener, removeDatabaseListener } from "./utility"
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
                        dispatch(addDatabaseListener(`bands/${key}`))

                    },
                    (error) => {
                        dispatch(bandFail(error.message));
                        console.log('Bands listener removed', error.message)
                        dispatch(removeDatabaseListener(`bands/${key}`))
                        ref.off()
                    }
                );
        });
    };
};

export const updateBandInfo = (bandId, bandData) => {
    return () => {
        firebase.database().ref(`bands/${bandId}`).update(bandData)
    }
}

export const addBandMember = (bandId, username) => {
    return (dispatch) => {
        firebase
            .database()
            .ref(`usernames/${username}`)
            .once("value")
            .then((snapshot) => {
                const userId = snapshot.val();
                if (userId === null)
                    return dispatch(bandFail("Username does not exist"));

                firebase
                    .database()
                    .ref(`bands/${bandId}/members/${userId}`)
                    .set(username)
                    .catch((error) => console.log(error));

                dispatch(addBandToUser(userId, bandId))
            })
            .catch((error) => {
                console.log(error);
                dispatch(bandFail(error.message));
            });
    };
};

export const removeBandMember = (bandId, userId) => {
    return () => {
        firebase.database().ref(`bands/${bandId}/members/${userId}`).remove();
        firebase.database().ref(`users/${userId}/bands/${bandId}`).remove();
    }
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
                dispatch(setBandProfileImage(bandId, pathRef))
            })
            .catch((err) => {
                console.dir(err);
            });
    };
};

export const setBandProfileImage = (bandId, imagePath) => {
    return () => {
        firebase.storage().ref(imagePath).getDownloadURL().then(url => {
            firebase
                .database()
                .ref(`bands/${bandId}`).update({bandImage: url}).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
}

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
