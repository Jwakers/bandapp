import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = [];

function addListener(state, action) {
    return [...new Set([
        ...state,
        action.ref
    ])].sort()
    // Sort is only used for easier debugging in redux dev tools
}

function removeListener(state, action) {
    return state.filter(ref => ref !== action.ref)
}

function removeAllListeners() {
    return INITIAL_STATE
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_LISTENER:
            return addListener(state, action);
        case actionTypes.REMOVE_LISTENER:
            return removeListener(state, action);
        case actionTypes.REMOVE_ALL_LISTENERS:
            return removeAllListeners(state, action);
        default:
            return state;
    }
};
