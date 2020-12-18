import firebase from "firebase/app";
import "firebase/database";

import * as actionTypes from './actionTypes'

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

export const fetchProjects = (userId) => {
    return (dispatch) => {
        dispatch(projectsStart())
        const ref = firebase.database().ref("projects").orderByChild('userId').equalTo(userId);
        ref.on('value', snap => {
            dispatch(projectsSuccess(snap.val()))
        }, error => {
            dispatch(projectsFail(error.message))
        })
    };
};

export const createNewProject = (projectData) => {
    return () => {
        firebase.database().ref('projects').push(projectData)
    };
};

// TODO: Convert: create, update, and fetch (projects and tasks) into utility functions.
export function updateProject(projectId, projectData) {
    return (dispatch) => {
        firebase.database().ref(`projects/${projectId}`).update(projectData);
    };
}
