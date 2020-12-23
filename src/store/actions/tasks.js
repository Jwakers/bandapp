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

export const fetchTasks = (locationId) => {
    return (dispatch) => {
        dispatch(tasksStart());
        firebase
            .database()
            .ref(`tasks/${locationId}`)
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

export const createNewTask = (taskData, locationId) => {
    return () => {
        firebase.database().ref(`tasks/${locationId}`).push(taskData);
    };
};

export function updateTask(locationId, taskId, taskData) {
    console.log(locationId, taskId, taskData)
    return () => {
        firebase.database().ref(`tasks/${locationId}/${taskId}`).update(taskData).catch(error => {
            console.log(error)
        });
    };
}
