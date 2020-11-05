import axios from "../../axios-projects";

import * as actionTypes from './actionTypes'

export const fetchProjects = () => {
    return (dispatch) => {
        axios
            .get("/projects.json")
            .then((response) => {
                dispatch(setProjects(response.data))
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    };
};

export const fetchProject = (projectId) => {
    return (dispatch) => {
        axios
            .get(`/projects/${projectId}.json`)
            .then((response) => {
                console.log('Single:', response);
                // dispatch(addProject(response.data))
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    };
};

export const createNewProject = (projectData) => {
    return (dispatch) => {
        axios
            .post("/projects.json", projectData)
            .then(response => {
                dispatch(fetchProjects())
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    };
};

// TODO: Convert: create, update, and fetch (projects and tasks) into utility functions.
export function updateProject(projectId, projectData) {
    return (dispatch) => {
        axios
            .patch(`/projects/${projectId}.json`, projectData)
            .then(response => {
                console.log(response);
                dispatch(fetchProjects())
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    };
}

export const setProjects = (payload) => {
    return {
        type: actionTypes.SET_PROJECTS,
        payload,
    }
}

// export function updateProject(projectId, payload) {
//     return {
//         type: actionTypes.UPDATE_PROJECT,
//         projectId: projectId,
//         payload: payload,
//     };
// }