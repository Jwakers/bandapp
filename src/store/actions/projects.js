import axios from "../../axios-projects";

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

export const fetchProjects = (token) => {
    return (dispatch) => {
        dispatch(projectsStart())
        axios
            .get(`/projects.json?auth=${token}`)
            .then((response) => {
                dispatch(projectsSuccess(response.data))
            })
            .catch((error) => {
                // TODO: Handle error
                dispatch(projectsFail(error.response.data.error.message))
            });
    };
};

export const createNewProject = (projectData, token) => {
    return (dispatch) => {
        axios
            .post(`/projects.json?auth=${token}`, projectData)
            .then(response => {
                dispatch(fetchProjects(token))
            })
            .catch(error => {
                // TODO: Handle error
            });
    };
};

// TODO: Convert: create, update, and fetch (projects and tasks) into utility functions.
export function updateProject(projectId, projectData, token) {
    return (dispatch) => {
        axios
            .patch(`/projects/${projectId}.json?auth=${token}`, projectData)
            .then(response => {
                dispatch(fetchProjects(token))
            })
            .catch(error => {
                // TODO: Handle error
            });
    };
}



// export function updateProject(projectId, payload) {
//     return {
//         type: actionTypes.UPDATE_PROJECT,
//         projectId: projectId,
//         payload: payload,
//     };
// }