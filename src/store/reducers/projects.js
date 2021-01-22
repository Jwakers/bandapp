import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: null,
    projects: {}
};

function projectsStart(state) {
    return {
        ...state,
        loading: true
    };
}

function projectsSuccess(state, action) {
    return {
        ...state,
        loading: false,
        error: null,
        projects: {
            ...state.projects,
            ...action.project,
        }
    };
}

function projectsFail(state, action) {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PROJECTS_START:
            return projectsStart(state, action);
        case actionTypes.PROJECTS_SUCCESS:
            return projectsSuccess(state, action);
        case actionTypes.PROJECTS_FAIL:
            return projectsFail(state, action);
        default:
            return state;
    }
};
