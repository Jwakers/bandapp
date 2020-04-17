export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_TASK = "UPDATE_TASK";

// Action creators
export function addProject(payload) {
    return {
        type: ADD_PROJECT,
        payload
    };
}

export function addTask(payload) {
    return {
        type: ADD_TASK,
        payload
    };
}

export function updateTask(taskId, payload) {
    return {
        type: UPDATE_TASK,
        taskId: taskId,
        payload: payload
    };
}

export function updateProject(projectId, payload) {
    return {
        type: UPDATE_PROJECT,
        projectId: projectId,
        payload: payload
    };
}