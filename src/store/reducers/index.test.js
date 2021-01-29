import { rootReducer } from "./index";
import * as actionTypes from "../actions/actionTypes";

describe("root reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            projects: {
                loading: false,
                error: null,
                projects: {},
            },
            tasks: {
                loading: false,
                error: null,
                tasks: {},
            },
            auth: {
                userId: null,
                email: null,
                error: null,
                loading: false,
            },
            user: {
                loading: false,
                error: null,
                user: {},
            },
            bands: {
                loading: false,
                error: null,
                bands: {},
            },
            comments: {
                loading: false,
                error: null,
                comments: {},
            },
            databaseListeners: [],
        };
    });

    it("should set all states to initial state", () => {
        const updatedState = {
            projects: {
                ...initialState.projects,
                projects: { someProjectId: { heading: "project" } },
            },
            tasks: {
                ...initialState.tasks,
                tasks: { someTaskId: { heading: "task" } },
            },
            auth: {
                ...initialState.auth,
                userId: "someUserId",
                email: "user@email.com",
            },
            user: {
                ...initialState.user,
                user: {
                    userId: "someUserId",
                },
            },
            bands: {
                ...initialState.bands,
                bands: {
                    someBandId: {
                        bandName: "some band name",
                    },
                },
            },
            comments: {
                ...initialState.comments,
                comments: {
                    someCommentId: {
                        comment: "A test comment",
                    },
                },
            },
            databaseListeners: ["someRef/location", "otherRef/location2"],
        };

        expect(
            rootReducer(updatedState, {
                type: actionTypes.AUTH_LOGOUT,
            })
        ).toEqual(initialState);
    });
});
