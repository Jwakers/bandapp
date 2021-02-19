import * as actionTypes from "../actions/actionTypes";
// import { objectsToArray } from "../../shared/utility";

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

// Not in use

// function commentsDeleteByProject(state, action) {
//     const commentsArray = objectsToArray(state.comments, true).filter(
//         (task) => task.projectId !== action.projectId
//     );
//     const newTaskSet = {};
//     commentsArray.forEach((task) => {
//         const id = task.id;
//         delete task.id;
//         return newTaskSet[id] = {...task}
//     });
//     return {
//         ...state,
//         comments: {
//             ...newTaskSet,
//         },
//     };
// }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.COMMENTS_START:
            return commentsStart(state, action);
        case actionTypes.COMMENTS_SUCCESS:
            return commentsSuccess(state, action);
        case actionTypes.COMMENTS_FAIL:
            return commentsFail(state, action);
        case actionTypes.COMMENTS_DELETE:
            return commentDelete(state, action);
        // case actionTypes.COMMENTS_DELETE_BY_PROJECT:
        //     return commentsDeleteByProject(state, action);
        default:
            return state;
    }
};
