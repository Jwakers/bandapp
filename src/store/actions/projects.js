import firebase from "firebase/app";
import "firebase/database";

import * as actionTypes from "./actionTypes";

export const projectsStart = () => {
    return {
        type: actionTypes.PROJECTS_START,
    };
};

export const projectsSuccess = (payload) => {
    return {
        type: actionTypes.PROJECTS_SUCCESS,
        payload,
    };
};

export const projectsFail = (error) => {
    return {
        type: actionTypes.PROJECTS_FAIL,
        error,
    };
};

export const fetchProjects = (locationId) => {
    return (dispatch) => {
        dispatch(projectsStart());
        firebase
            .database()
            .ref(`projects/${locationId}`)
            .on(
                "value",
                (snap) => {
                    dispatch(projectsSuccess(snap.val()));
                },
                (error) => {
                    dispatch(projectsFail(error.message));
                }
            );
    };
};

export const createNewProject = (projectData, locationId) => {
    return () => {
        console.log(projectData, locationId)
        firebase.database().ref(`projects/${locationId}`).push(projectData)
        .catch(error => console.log(error));
    };
};

// TODO: Convert: create, update, and fetch (projects and tasks) into utility functions.
export function updateProject(projectId, projectData, userId) {
    return (dispatch) => {
        firebase.database().ref(`projects/${userId}/${projectId}`).update(projectData);
    };
}
