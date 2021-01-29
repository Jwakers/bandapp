import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            userId: null,
            email: null,
            error: null,
            loading: false,
        };
    });

    it("should return initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should store userId and email on AUTH_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_SUCCESS,
                userId: "some-userId",
                email: "test@email.com",
            })
        ).toEqual({
            userId: "some-userId",
            email: "test@email.com",
            error: null,
            loading: false,
        });
    });

    it("should store an error message on AUTH_FAIL", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_FAIL,
                error: "something failed",
            })
        ).toEqual({
            userId: null,
            email: null,
            error: "something failed",
            loading: false,
        });
    });

    it("Should clear user data on logout", () => {
        initialState.userId = "some-id";
        initialState.email = "test@email.com";
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_LOGOUT,
            })
        ).toEqual({
            userId: null,
            email: null,
            error: null,
            loading: false,
        });
    });
});
