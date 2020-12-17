import axios from "axios";
import * as actionTypes from "./actionTypes";

const API_KEY = "AIzaSyCKsBfSIX8H_O7c_5cuOtnoHvdQC65XQtQ";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        refreshToken: refreshToken,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const setAuthTimeout = (expirationTime, refreshToken) => {
    return (dispatch) => {
        setTimeout(() => {
            if (refreshToken) {
                dispatch(refreshAuth(refreshToken));
            } else {
                dispatch(logout());
            }
        }, expirationTime);
    };
};

export const refreshAuth = (token) => {
    return (dispatch) => {
        axios
            .post(
                `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
                {
                    grantType: "refresh_token",
                    refreshToken: token,
                }
            )
            .then((response) => {
                dispatch(
                    authSuccess(
                        response.data.id_token,
                        response.data.user_id,
                        response.data.refresh_token
                    )
                );
                dispatch(
                    setAuthTimeout(
                        response.data.expires_in * 1000,
                        response.data.refresh_token
                    )
                );
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error.message));
            });
        return {
            type: actionTypes.AUTH_REFRESH,
            token,
        };
    };
};

export const logout = () => {
    ["token", "expirationDate", "userId"].forEach((item) =>
        localStorage.removeItem(item)
    );
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            const userId = localStorage.getItem("userId");
            const refreshToken = localStorage.getItem("refreshToken");
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId, refreshToken));
                dispatch(
                    setAuthTimeout(
                        expirationDate.getTime() - new Date().getTime(),
                        refreshToken
                    )
                );
            }
        }
    };
};

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
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                dispatch(
                    authSuccess(
                        response.data.idToken,
                        response.data.localId,
                        response.data.refreshToken
                    )
                );
                dispatch(
                    setAuthTimeout(
                        response.data.expiresIn * 1000,
                        response.data.refreshToken
                    )
                );
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};
