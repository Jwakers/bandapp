import firebase from "../../firebase";
import "firebase/database";
import "firebase/auth";

import { addDatabaseListener, removeDatabaseListener } from "./utility";
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

export const tasksDeleteByProjectKey = (projectId) => {
    return {
        type: actionTypes.TASKS_DELETE_BY_PROJECT,
        projectId,
    };
};

export const fetchTasks = (projectId) => {
    return (dispatch) => {
        dispatch(tasksStart());
        const ref = firebase.database().ref(`tasks/${projectId}`);
        ref.on(
            "value",
            (snap) => {
                dispatch(tasksSuccess(snap.val()));
                dispatch(addDatabaseListener(`tasks/${projectId}`));
            },
            (error) => {
                dispatch(tasksFail(error.message));
                console.log("Tasks listener removed", error.message);
                dispatch(removeDatabaseListener(`tasks/${projectId}`));
                ref.off();
            }
        );
    };
};

export const createNewTask = (projectId, taskData) => {
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
            .catch((error) => console.log(error));
    };
}

export function deleteTasksOfProject(projectId) {
    return (dispatch) => {
        firebase
            .database()
            .ref(`tasks/${projectId}`)
            .remove()
            .then(() => dispatch(tasksDeleteByProjectKey(projectId)))
            .catch((error) => console.log(error));
    };
}
