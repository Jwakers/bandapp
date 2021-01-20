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

export const taskDeleteByKey = (taskKey) => {
    return {
        type: actionTypes.TASKS_DELETE,
        key: taskKey,
    };
};

export const fetchTasks = (projectIds) => {
    return (dispatch) => {
        dispatch(tasksStart());
        projectIds.forEach((projectId) => {
            firebase
                .database()
                .ref(`tasks/${projectId}`)
                .on(
                    "value",
                    (snap) => {
                        dispatch(tasksSuccess(snap.val()));
                    },
                    (error) => {
                        dispatch(tasksFail(error.message));
                    }
                );
        });
    };
};

export const createNewTask = (taskData, projectId) => {
    return () => {
        firebase.database().ref(`tasks/${projectId}`).push(taskData);
    };
};

export function updateTask(projectId, taskId, taskData) {
    return () => {
        firebase
            .database()
            .ref(`tasks/${projectId}/${taskId}`)
            .update(taskData)
            .catch((error) => console.log(error));
    };
}

export function deleteTask(projectId, taskId) {
    return (dispatch) => {
        firebase
            .database()
            .ref(`tasks/${projectId}/${taskId}`)
            .remove()
            .then(() => dispatch(taskDeleteByKey(taskId)))
            .catch((err) => console.log(err));
    };
}
