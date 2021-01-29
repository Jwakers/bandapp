import reducer from "./bands";
import * as actionTypes from "../actions/actionTypes";

describe("bands reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            loading: false,
            error: null,
            bands: {},
        };
    });

    it("should store band info on BANDS_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.BAND_SUCCESS,
                band: {
                    someRandomBandId: {
                        bandName: "some band name",
                    },
                },
            })
        ).toEqual(
            {
                loading: false,
                error: null,
                bands: {
                    someRandomBandId: {
                        bandName: "some band name",
                    }
                },
            }
        );
    });
});
