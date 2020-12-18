import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import * as actionTypes from "./actionTypes";

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
        dispatch(tasksStart());
        firebase
            .database()
            .ref(`tasks/${userId}`)
            .on(
                "value",
                (snap) => {
                    dispatch(tasksSuccess(snap.val()));
                },
                (error) => {
                    dispatch(tasksFail(error.message));
                }
            );
    };
};

export const createNewTask = (taskData, userId) => {
    return () => {
        firebase.database().ref(`tasks/${userId}`).push(taskData);
    };
};

export function updateTask(taskId, taskData, userId) {
    return () => {
        firebase.database().ref(`tasks/${userId}/${taskId}`).update(taskData).catch(error => {
            console.log(error)
        });
    };
}
