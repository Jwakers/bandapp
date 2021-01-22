import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { addDatabaseListener, removeDatabaseListener } from "./utility"
import * as actionTypes from "./actionTypes";

export const tasksStart = () => {
    return {
        type: actionTypes.TASKS_START,
    };
};

export const tasksSuccess = (task) => {
    return {
        type: actionTypes.TASKS_SUCCESS,
        task,
    };
};

export const tasksFail = (error) => {
    return {
        type: actionTypes.TASKS_FAIL,
        error,
    };
};

export const taskDeleteByKey = (taskId) => {
    return {
        type: actionTypes.TASKS_DELETE,
        taskId,
    };
};

export const fetchTasks = (projectIds) => {
    return (dispatch) => {
        dispatch(tasksStart());
        projectIds.forEach((projectId) => {
            const ref = firebase.database().ref(`tasks/${projectId}`)
            ref.on(
                    "value",
                    (snap) => {
                        dispatch(tasksSuccess(snap.val()));
                        dispatch(addDatabaseListener(`tasks/${projectId}`))
                    },
                    (error) => {
                        dispatch(tasksFail(error.message));
                        console.log('Tasks listener removed', error.message)
                        dispatch(removeDatabaseListener(`tasks/${projectId}`))
                        ref.off()
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
