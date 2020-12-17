import axios from "../../axios-projects";

import * as actionTypes from './actionTypes'

export const tasksStart = () => {
    return {
        type: actionTypes.TASKS_START,
    };
};

export const tasksSuccess = (payload) => {
    return {
        type: actionTypes.TASKS_SUCCESS,
        payload,
    };
};

export const tasksFail = (error) => {
    return {
        type: actionTypes.TASKS_FAIL,
        error,
    };
};

export const fetchTasks = (token, userId) => {
    return (dispatch) => {
        dispatch(tasksStart())
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios
            .get(`/tasks.json${queryParams}`)
            .then((response) => {
                dispatch(tasksSuccess(response.data))
            })
            .catch((error) => {
                // TODO: Handle error
                dispatch(tasksFail(error.response.data.error.message))
            });
    };
};

export const createNewTask = (taskData, token) => {
    return (dispatch) => {
        axios
            .post(`/tasks.json?auth=${token}`, taskData)
            .then(response => {
                dispatch(fetchTasks(token))
            })
            .catch(error => {
                // TODO: Handle error
            });
    };
};

// TODO: Convert: create, update, and fetch (tasks and tasks) into utility functions.
export function updateTask(taskId, taskData, token, userId) {
    return (dispatch) => {
        axios
            .patch(`/tasks/${taskId}.json?auth=${token}`, taskData)
            .then(response => {
                dispatch(fetchTasks(token, userId))
            })
            .catch(error => {
                // TODO: Handle error
            });
    };
}