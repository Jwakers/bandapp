import reducer from "./projects";
import * as actionTypes from "../actions/actionTypes";

describe("projects reducer", () => {
    let initialState = {
        loading: false,
        error: null,
        projects: {
            someProjectId: {
                heading: "project 1",
            },
        },
    };
    it("should add a new project and retain other projects", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.PROJECTS_SUCCESS,
                project: {
                    someOtherProjectId: {
                        heading: "project 2",
                    },
                },
            })
        ).toEqual({
            loading: false,
            error: null,
            projects: {
                someProjectId: {
                    heading: "project 1",
                },
                someOtherProjectId: {
                    heading: "project 2",
                },
            },
        });
    });
});
