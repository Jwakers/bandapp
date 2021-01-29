import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: null,
    comments: {}
};

function commentsStart(state) {
    return {
        ...state,
        loading: true
    };
}

function commentsSuccess(state, action) {
    return {
        ...state,
        loading: false,
        error: null,
        comments: {
            ...action.comments,
        }
    };
}

function commentsFail(state, action) {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

function commentDelete(state, action) {
    const updatedComments = {
        ...state.comments
    }
    delete updatedComments[action.commentId]
    return {
        ...state,
        comments: {
            ...updatedComments
        }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.COMMENTS_START:
            return commentsStart(state, action);
        case actionTypes.COMMENTS_SUCCESS:
            return commentsSuccess(state, action);
        case actionTypes.COMMENTS_FAIL:
            return commentsFail(state, action);
        case actionTypes.COMMENTS_DELETE:
            return commentDelete(state, action)
        default:
            return state;
    }
};
