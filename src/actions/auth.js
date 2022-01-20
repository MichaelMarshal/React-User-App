import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE, LOGIN,
} from "./types";

import AuthService from "../services/auth.service";

export const registerAction = (user) => {
    return {
        type: REGISTER,
        user
    }
};
export const loginAction = (user) => {
    return {
        type: LOGIN,
        user
    }
};
export const loginOutAction = (user) => {
    AuthService.logout();
    return {
        type: LOGOUT
    }
};

export const register = (username, email, password) => (dispatch) => {
    AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

        }
    );
};

export const login = (user) => async (dispatch) => {
    return AuthService.login(user.username, user.password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
