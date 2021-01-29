import React, { useRef, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Comment from "./Comment";
import CreateCommentForm from "../Form/CreateCommentForm";

import { objectsToArray } from "../../shared/utility";

const Comments = (props) => {
    const commentsEndRef = useRef(null)

    useEffect(() => {
        if (commentsEndRef.current)
            commentsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest'})
    }, [props.comments])

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const input = event.target.elements["comment"];
        const commentData = {
            createdOn: new Date().toString(),
            createdBy: props.userId,
            projectId: props.projectId,
            comment: input.value,
        };
        props.submitNewComment(props.projectId, commentData);
    };

    return (
        <div className="comments">
            <div className="comments__content">
                {props.comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        {...comment}
                        isSelf={comment.createdBy === props.userId}
                    />
                ))}
                <div ref={commentsEndRef}></div>
            </div>
            <CreateCommentForm onSubmit={handleCommentSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        comments: objectsToArray(state.comments.comments, true),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewComment: (projectId, comment) =>
            dispatch(actions.submitNewComment(projectId, comment)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
