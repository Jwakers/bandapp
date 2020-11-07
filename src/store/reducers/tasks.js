import * as actionTypes from "../actions/actionTypes";

const taskState = {
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
            ...action.payload,
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

export default (state = taskState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_START:
            return taskStart(state, action);
        case actionTypes.TASKS_SUCCESS:
            return taskSuccess(state, action);
        case actionTypes.TASKS_FAIL:
            return taskFail(state, action);
        // case actionTypes.UPDATE_PROJECT:
        //     return updateProject(state, action)
        default:
            return state;
    }
};
