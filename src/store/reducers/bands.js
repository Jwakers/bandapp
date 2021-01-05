import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: null,
    bands: {},
};

function bandStart(state) {
    return {
        ...state,
        loading: true
    };
}

function bandSuccess(state, action) {
    return {
        ...state,
        loading: false,
        error: null,
        bands: {
            ...state.bands,
            ...action.band,
        }
    };
}

function bandFail(state, action) {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.BAND_START:
            return bandStart(state, action);
        case actionTypes.BAND_SUCCESS:
            return bandSuccess(state, action);
        case actionTypes.BAND_FAIL:
            return bandFail(state, action);
        default:
            return state;
    }
};
