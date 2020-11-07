import * as actionTypes from "../actions/actionTypes";

const projectsState = {
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
            ...action.payload,
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

export default (state = projectsState, action) => {
    switch (action.type) {
        case actionTypes.PROJECTS_START:
            return projectsStart(state, action);
        case actionTypes.PROJECTS_SUCCESS:
            return projectsSuccess(state, action);
        case actionTypes.PROJECTS_FAIL:
            return projectsFail(state, action);
        // case actionTypes.UPDATE_PROJECT:
        //     return updateProject(state, action)
        default:
            return state;
    }
};
