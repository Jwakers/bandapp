import reducer from "./databaseListeners";

import * as actionTypes from "../actions/actionTypes";

describe("database listeners reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = [];
    });

    it("Should remove database listener", () => {
        initialState = ["testRef", "testRef2"];
        expect(
            reducer(initialState, {
                type: actionTypes.REMOVE_LISTENER,
                ref: "testRef",
            })
        ).toEqual(["testRef2"]);
    });

    it("should add new reference and return an array of unique items", () => {
        initialState = ["testRef", "testRef"];
        expect(
            reducer(initialState, {
                type: actionTypes.ADD_LISTENER,
                ref: "newListener",
            })
        ).toEqual(["newListener", "testRef"]);
    });
});
