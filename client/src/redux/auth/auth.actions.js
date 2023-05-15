import * as authTypes from './auth.actionTypes';
import axios from "axios"

/**
 * - SIGNIN FOR USERS
 * @param {cred} cred - credentials for signin `cred: {name, password}`
 * @param {navigate} navigate - navigate for navigating the user to the `Home` page
 * */
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

export const gSigninAction = () => async (dispatch) => {


    dispatch({ type: authTypes.GAUTH_LOADING });
    try {
        const res = await axios.get(`/auth/google`);

        const data = await res.data;
        console.log(data)

        dispatch({ type: authTypes.GAUTH_SUCCESS });
        alert("Login Success");
    } catch (error) {
        console.log('error:', error);
        dispatch({ type: authTypes.GAUTH_ERROR });
        alert(error?.response?.data?.error?.message || error?.response?.data?.error || "something went wrong");
    }
}


/**
 * - SIGNUP FOR USERS
 * @param {cred} cred - credentials for signin `cred: {name,email, password}`
 * @param {gotoSignin} gotoSignin - navigate for send the user to the `sign-in` component
 * */
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