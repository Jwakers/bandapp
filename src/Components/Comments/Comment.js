import React, { useState } from "react";
import { connect } from "react-redux";

import Modal from "../Modal/Modal";
import EditCommentForm from "../Form/EditCommentForm";

import * as actions from "../../store/actions/";

export const Comment = (props) => {
    const [showUpdate, setShowUpdate] = useState(false);
    const parseDate = (dateString) => {
        // If the comment was written today, the time is returned else the date of writing
        const createdOn = new Date(dateString);
        const createdOnString = createdOn.toLocaleDateString();
        const now = new Date();
        const wasToday = createdOnString === now.toLocaleDateString();
        if (wasToday) return createdOn.toLocaleTimeString();
        return createdOnString;
    };
    const toggleUpdateModal = () => {
        setShowUpdate((prev) => !prev);
    };

    const handleEditCommentSubmit = (event) => {
        event.preventDefault();
        const newComment = event.target.elements['comment'].value
        props.editComment(props.projectId, props.id, newComment)
        setShowUpdate(false)
    };
    const handleDeleteCommentSubmit = (event) => {
        event.preventDefault();
        props.deleteComment(props.projectId, props.id)
        setShowUpdate(false)
    };
    const handleClick = () => {
        if (props.isSelf) toggleUpdateModal();
    };
    const classes = ["comment", props.isSelf ? "comment--self" : ""];
    return (
        <>
            <div className={classes.join(" ")} onClick={handleClick}>
                <div className="comment__by">
                    {props.isSelf ? "You" : props.createdBy}
                </div>
                <div className="comment__when">
                    {parseDate(props.createdOn)}
                </div>
                <div className="comment__body">{props.comment}</div>
            </div>
            {props.isSelf && (
                <Modal active={showUpdate} toggle={toggleUpdateModal}>
                    <EditCommentForm
                        onSubmit={handleEditCommentSubmit}
                        comment={props.comment}
                        delete={handleDeleteCommentSubmit}
                    />
                </Modal>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (projectId, commentId, newComment) =>
            dispatch(actions.editComment(projectId, commentId, newComment)),
            deleteComment: (projectId, commentId) => dispatch(actions.deleteComment(projectId, commentId))
    };
};

export default connect(null, mapDispatchToProps)(Comment);
