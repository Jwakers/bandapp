import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: null,
    tasks: {}
};

function taskStart(state) {
    return {
        ...state,
        loading: true
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
        }
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
        ...state.tasks
    }
    delete updatedTasks[action.taskId]
    return {
        ...state,
        tasks: {
            ...updatedTasks
        }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.TASKS_START:
            return taskStart(state, action);
        case actionTypes.TASKS_SUCCESS:
            return taskSuccess(state, action);
        case actionTypes.TASKS_DELETE:
            return taskDelete(state, action)
        case actionTypes.TASKS_FAIL:
            return taskFail(state, action);
        default:
            return state;
    }
};
