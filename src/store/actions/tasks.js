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

export const fetchTasks = (token) => {
    return (dispatch) => {
        dispatch(tasksStart())
        axios
            .get(`/tasks.json?auth=${token}`)
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
export function updateTask(taskId, taskData, token) {
    return (dispatch) => {
        axios
            .patch(`/tasks/${taskId}.json?auth=${token}`, taskData)
            .then(response => {
                dispatch(fetchTasks(token))
            })
            .catch(error => {
                // TODO: Handle error
            });
    };
}