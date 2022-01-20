import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, REGISTER,
} from "../actions/types";

const user = localStorage.getItem("user");

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    let response = action.response;

    switch (type) {
        case REGISTER:
            return {
                ...state, response
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                response,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                response,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
