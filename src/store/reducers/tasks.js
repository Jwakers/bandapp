import * as actionTypes from "../actions/actionTypes";
import { objectsToArray } from "../../shared/utility";

const INITIAL_STATE = {
    loading: false,
    error: null,
    tasks: {},
};

function taskStart(state) {
    return {
        ...state,
        loading: true,
    };
}

function taskSuccess(state, action) {
    return {
        ...state,
        loading: false,
        error: null,
        tasks: {
            ...state.tasks,
            ...action.task,
        },
    };
}

function taskFail(state, action) {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

function taskDelete(state, action) {
    const updatedTasks = {
        ...state.tasks,
    };
    delete updatedTasks[action.taskId];
    return {
        ...state,
        tasks: {
            ...updatedTasks,
        },
    };
}

function tasksDeleteByProject(state, action) {
    const tasksArray = objectsToArray(state.tasks, true).filter(
        (task) => task.projectId !== action.projectId
    );
    const newTaskSet = {};
    tasksArray.forEach((task) => {
        const id = task.id;
        delete task.id;
        return newTaskSet[id] = {...task}
    });
    return {
        ...state,
        tasks: {
            ...newTaskSet,
        },
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.TASKS_START:
            return taskStart(state, action);
        case actionTypes.TASKS_SUCCESS:
            return taskSuccess(state, action);
        case actionTypes.TASKS_DELETE:
            return taskDelete(state, action);
        case actionTypes.TASKS_DELETE_BY_PROJECT:
            return tasksDeleteByProject(state, action);
        case actionTypes.TASKS_FAIL:
            return taskFail(state, action);
        default:
            return state;
    }
};
