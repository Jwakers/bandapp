import firebase from "../../firebase";
import "firebase/database";

import { deleteTasksOfProject } from './tasks'
import { deleteCommentsOfProject } from "./comments"
import { addDatabaseListener, removeDatabaseListener } from "./utility"
import * as actionTypes from "./actionTypes";

export const projectsStart = () => {
    return {
        type: actionTypes.PROJECTS_START,
    };
};

export const projectsSuccess = (project) => {
    return {
        type: actionTypes.PROJECTS_SUCCESS,
        project,
    };
};

export const projectsFail = (error) => {
    return {
        type: actionTypes.PROJECTS_FAIL,
        error,
    };
};

export const projectDeleteByKey = (projectId) => {
    return {
        type: actionTypes.PROJECTS_DELETE,
        projectId,
    };
};

export const fetchProjects = (locationIds) => {
    return (dispatch) => {
        dispatch(projectsStart());
        locationIds.forEach((location) => {
            const ref = firebase.database().ref(`projects/${location}`);
            ref.on(
                "value",
                (snap) => {
                    dispatch(projectsSuccess(snap.val()));
                    dispatch(addDatabaseListener(`projects/${location}`))
                },
                (error) => {
                    dispatch(projectsFail(error.message));
                    console.log("Projects listener removed", error.message);
                    dispatch(removeDatabaseListener(`projects/${location}`))
                    ref.off();
                }
            );
        });
    };
};

export const createNewProject = (projectData, locationId) => {
    return () => {
        firebase
            .database()
            .ref(`projects/${locationId}`)
            .push(projectData)
            .catch((error) => console.log(error));
    };
};

export function updateProject(locationId, projectId, projectData) {
    return () => {
        firebase
            .database()
            .ref(`projects/${locationId}/${projectId}`)
            .update(projectData);
    };
}

export function deleteProject(locationId, projectId) {
    return (dispatch) => {
        firebase
            .database()
            .ref(`projects/${locationId}/${projectId}`)
            .remove()
            .then(() => {
                dispatch(projectDeleteByKey(projectId))
                dispatch(deleteTasksOfProject(projectId))
                dispatch(deleteCommentsOfProject(projectId))
            })
            .catch((err) => console.log(err));
    };
}
