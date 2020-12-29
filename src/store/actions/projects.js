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

export const fetchProjects = (locationIds) => {
    return (dispatch) => {
        dispatch(projectsStart());
        locationIds.forEach(location => {
            firebase
                .database()
                .ref(`projects/${location}`)
                .on(
                    "value",
                    (snap) => {
                        dispatch(projectsSuccess(snap.val()));
                    },
                    (error) => {
                        dispatch(projectsFail(error.message));
                    }
                );
        })
    };
};

export const createNewProject = (projectData, locationId) => {
    return () => {
        firebase.database().ref(`projects/${locationId}`).push(projectData)
        .catch(error => console.log(error));
    };
};

export function updateProject(locationId, projectId, projectData) {
    return () => {
        firebase.database().ref(`projects/${locationId}/${projectId}`).update(projectData);
    };
}
