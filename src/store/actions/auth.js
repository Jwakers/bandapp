import axios from "axios";
import * as actionTypes from "./actionTypes";

const API_KEY = "AIzaSyCKsBfSIX8H_O7c_5cuOtnoHvdQC65XQtQ";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
            // 1 hour
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
        if (!isSignUp)
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
        url += API_KEY;
        axios
            .post(url, authData)
            .then((response) => {
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};
