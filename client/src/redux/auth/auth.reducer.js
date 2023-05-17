import * as authTypes from './auth.actionTypes';

const initialState = {
    loading: false,
    error: false,
    isAuthenticated: JSON.parse(sessionStorage.getItem("isAuth")) || false,
    user: {},
}

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case authTypes.AUTH_LOADING: {
            return { ...state, loading: true, error: false };
        }

        case authTypes.AUTH_ERROR: {
            return { ...state, loading: false, error: true };
        }

        case authTypes.AUTH_SUCCESS: {
            return { ...state, loading: false, error: false };
        }

        case authTypes.AUTH_LOGIN_SUCCESS: {
            sessionStorage.setItem("isAuth", true);
            return { loading: false, error: false, isAuthenticated: true, token: payload }
        }

        case authTypes.GAUTH_SUCCESS: {
            sessionStorage.setItem("isAuth", true);
            return { loading: false, error: false, isAuthenticated: true }
        }

        case authTypes.AUTH_LOGOUT: {
            sessionStorage.clear();
            return initialState;
        }

        default: return state;
    }
}