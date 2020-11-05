import * as actionTypes from './actionTypes';

import axios from '../../axios-projects';

export function addTask(payload) {
    return {
        type: actionTypes.ADD_TASK,
        payload,
    };
}

export function updateTask(taskId, taskData) {
    return (dispatch) => {
        axios
            .patch(`/tasks/${taskId}.json`, taskData)
            .then(response => {
                console.log(taskId, taskData)
                console.log(response)
                dispatch(fetchTasks())
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    };
}

export const createNewTask = (taskData) => {
    return (dispatch) => {
        axios
            .post("/tasks.json", taskData)
            .then(response => {
                dispatch(fetchTasks())
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    };
}

export const fetchTasks = () => {
    return (dispatch) => {
        axios
            .get("/tasks.json")
            .then((response) => {
                dispatch(setTasks(response.data))
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    };
};

export const setTasks = (payload) => {
    return {
        type: actionTypes.SET_TASKS,
        payload,
    }
}