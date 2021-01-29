import firebase from "firebase/app";
import "firebase/database";

import { addDatabaseListener, removeDatabaseListener } from "./utility"
import * as actionTypes from "./actionTypes";

export const commentsStart = () => {
    return {
        type: actionTypes.COMMENTS_START,
    };
};

export const commentsSuccess = (comments) => {
    return {
        type: actionTypes.COMMENTS_SUCCESS,
        comments,
    };
};

export const commentsFail = (error) => {
    return {
        type: actionTypes.COMMENTS_FAIL,
        error,
    };
};

export const commentDeleteByKey = (commentId) => {
    return {
        type: actionTypes.TASKS_DELETE,
        commentId,
    };
};

export function editComment(projectId, commentId, comment) {
    return () => {
        firebase
            .database()
            .ref(`comments/${projectId}/${commentId}`)
            .update({comment: comment})
            .catch((error) => console.log(error));
    };
}

export function deleteComment(projectId, commentId) {
    return (dispatch) => {
        firebase
            .database()
            .ref(`comments/${projectId}/${commentId}`)
            .remove()
            .then(() => dispatch(commentDeleteByKey(commentId)))
            .catch((err) => console.log(err));
    };
}

export const fetchComments = (projectId) => {
    const location = `comments/${projectId}`;
    return (dispatch) => {
        dispatch(commentsStart())
        const ref = firebase.database().ref(location)
        ref.on(
            "value",
            (snap) => {
                dispatch(commentsSuccess(snap.val()));
                dispatch(addDatabaseListener(location))
            },
            error => {
                dispatch(commentsFail(error.message))
                dispatch(removeDatabaseListener(location))
                ref.off()
            }
        )
    }
}

export const submitNewComment = (projectId, commentData) => {
    return () => {
        firebase.database().ref(`comments/${projectId}`).push(commentData);
    };
};
