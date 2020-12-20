import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userId: null,
    email: null,
    error: null,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null
            }
        default:
            return state;
    }
};