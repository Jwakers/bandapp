import reducer from "./comments";

import * as actionTypes from "../actions/actionTypes";

describe("database listeners reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            loading: false,
            error: null,
            comments: {
                someCommentId: {
                    comment: "comment 1",
                },
            },
        };
    });

    it('should replace all comments with newly fetched', () => {
        expect(reducer(initialState, {
            type: actionTypes.COMMENTS_SUCCESS,
            comments: {
                someOtherCommentId: {
                    comment: 'comment 2'
                }
            }
        })).toEqual(
            {
                loading: false,
                error: null,
                comments: {
                    someOtherCommentId: {
                        comment: 'comment 2'
                    }
                }
            }
        )
    })

    it("should remove comment from state", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.COMMENTS_DELETE,
                commentId: "someCommentId",
            })
        ).toEqual({
            loading: false,
            error: null,
            comments: {},
        });
    });
});
