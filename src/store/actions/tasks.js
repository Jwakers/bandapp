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

export const fetchTasks = (projectIds) => {
    return (dispatch) => {
        dispatch(tasksStart());
        projectIds.forEach(projectId => {
        firebase
            .database()
            .ref(`tasks/${projectId}`)
            .on(
                "value",
                (snap) => {
                    console.log('Task lister', snap.val())
                    dispatch(tasksSuccess(snap.val()));
                    // Tasks are stacking because of multiple requests(...state.tasks - see reducer),
                    // so deleting tasks does not remove them from state, tasks can only be added and manipulated.
                    // https://www.pluralsight.com/guides/using-firebase-with-react-and-redux
                    dispatch(taskDelete())
                },
                (error) => {
                    dispatch(tasksFail(error.message));
                }
            );
        })
    };
};

export const createNewTask = (taskData, projectId) => {
    return () => {
        firebase.database().ref(`tasks/${projectId}`).push(taskData);
    };
};

export function updateTask(projectId, taskId, taskData) {
    return () => {
        firebase.database().ref(`tasks/${projectId}/${taskId}`).update(taskData).catch(error => console.log(error));
    };
};

export function deleteTask(projectId, taskId) {
    return () => {
        firebase.database().ref(`tasks/${projectId}/${taskId}`).remove().catch(err => console.log(err))
    };
};
