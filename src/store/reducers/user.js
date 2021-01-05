import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: null,
    user: {}
};

function userStart(state) {
    return {
        ...state,
        loading: true
    };
}

function userSuccess(state, action) {
    return {
        ...state,
        loading: false,
        error: null,
        user: {
            ...action.user,
        }
    };
}

function userFail(state, action) {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER_START:
            return userStart(state, action);
        case actionTypes.USER_SUCCESS:
            return userSuccess(state, action);
        case actionTypes.USER_FAIL:
            return userFail(state, action);
        default:
            return state;
    }
};
