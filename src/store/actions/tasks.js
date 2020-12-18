import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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

export const fetchTasks = (userId) => {
    return (dispatch) => {
        dispatch(tasksStart())
        const ref = firebase.database().ref("tasks").orderByChild('userId').equalTo(userId);
        ref.on('value', snap => {
            dispatch(tasksSuccess(snap.val()))
        }, error => {
            dispatch(tasksFail(error.message))
        })
    };
};

export const createNewTask = (taskData) => {
    return () => {
        firebase.database().ref('tasks').push(taskData)
    };
};

export function updateTask(taskId, taskData) {
    return (dispatch) => {
        firebase.database().ref(`tasks/${taskId}`).update(taskData);
    };
}