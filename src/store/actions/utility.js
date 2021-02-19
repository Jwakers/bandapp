import firebase from "../../firebase";
import "firebase/database";

import * as actionTypes from "./actionTypes";

export const removeAllDatabaseListeners = (references) => {
    references.forEach((r) => {
        firebase.database().ref(r).off();
    });
    return {
        type: actionTypes.REMOVE_ALL_LISTENERS,
    };
};

export const addDatabaseListener = (ref) => {
    return {
        type: actionTypes.ADD_LISTENER,
        ref,
    };
};

export const removeDatabaseListener = (ref) => {
    return {
        type: actionTypes.REMOVE_LISTENER,
        ref,
    };
};
