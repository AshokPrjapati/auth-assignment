import * as authTypes from './auth.actionTypes';
import axios from "axios"

export const signinAction = (cred, navigate) => async (dispatch) => {

    if (!cred.email || !cred.password) return alert("Please fill all fields");
    dispatch({ type: authTypes.AUTH_LOADING });
    try {
        const res = await axios.post(`/auth/login`, cred)

        const data = await res.data;
        console.log(data)

        dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: data.token });
        navigate('/');
        alert("Login Success");
    } catch (error) {
        console.log('error:', error);
        dispatch({ type: authTypes.AUTH_ERROR });
        alert(error?.response?.data?.error?.message || error?.response?.data?.error || "something went wrong");
    }
}

export const getLoginStatus = () => async (dispatch) => {


    dispatch({ type: authTypes.AUTH_LOADING });
    try {
        const res = await axios.get(`/auth/status`, { withCredentials: true });

        const data = await res.data;
        console.log(data)

        dispatch({ type: authTypes.GAUTH_SUCCESS });
    } catch (error) {
        console.log('error:', error);
        dispatch({ type: authTypes.AUTH_ERROR });
        alert(error?.response?.data?.error?.message || error?.response?.data?.error || "something went wrong");
    }
}


export const signupAction = (cred, gotoSignin) => async (dispatch) => {
    if (!cred.email || !cred.password || !cred.name) return;
    // ? PASSWORD VERIFIER
    if (cred.password.length <= 5) {
        alert('Password must contain more than 5 char!')
        return;
    }

    // ? EMAIL VERIFIER
    if (!cred.email.includes("@") || !cred.email.includes(".com")) {
        alert('Invalid email address');
        return;
    }


    dispatch({ type: authTypes.AUTH_LOADING });

    try {
        const res = await axios.post(`/auth/register`, cred)

        const data = await res.data;

        dispatch({ type: authTypes.AUTH_SUCCESS });
        gotoSignin(true);
        alert(data.message);
    } catch (error) {
        console.log('error:', error);
        dispatch({ type: authTypes.AUTH_ERROR });
        alert(error?.response?.data?.error?.message || error?.response?.data?.error || "something went wrong");
    }
}


export const logoutAction = () => async (dispatch) => {

    dispatch({ type: authTypes.AUTH_LOADING });
    try {
        const res = await axios.post(`/auth/logout`)

        const data = await res.data;

        dispatch({ type: authTypes.AUTH_SUCCESS });
        alert(data.message);
    } catch (error) {
        console.log('error:', error);
        if (error.response.status === 401) {
            return dispatch({ type: authTypes.AUTH_LOGOUT })
        }
        dispatch({ type: authTypes.AUTH_ERROR });
        alert(error?.response?.data?.error?.message || error?.response?.data?.error || "something went wrong");
    }
}
