export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
export const UPDATE_PROJECT = "UPDATE_PROJECT";

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

export function updateTaskStatus(taskId, status) {
    return {
        type: UPDATE_TASK_STATUS,
        taskId: taskId,
        status: status
    };
}

export function updateProject(projectId, payload) {
    return {
        type: UPDATE_PROJECT,
        projectId: projectId,
        payload: payload
    };
}