import { useCallback, useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { signinAction, signupAction } from '../redux/auth/auth.actions';


function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [signin, setSignin] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.authManager);


    const handelGAuth = () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const cred = {
            password: e.target.password.value,
            email: e.target.email.value
        }

        if (signin) {
            dispatch(signinAction(cred, navigate));
        } else {
            cred.name = e.target.name.value;
            dispatch(signupAction(cred, setSignin));
        }
    }, [signin])


    return (
        <div className={"box"}>
            <h2>{signin ? "Sign in" : "Sign up"}</h2>
            <form onSubmit={handleSubmit}>
                <div className={"inputBox"} style={{ display: signin ? "none" : "block" }}>
                    <input id="name" type="text" />
                    <label>Username</label>
                </div>
                <div className={"inputBox"}>
                    <input id="email" type="text" required />
                    <label>Email</label>
                </div>
                <div className={"inputBox"}>
                    <input id="password" type={showPassword ? "text" : "password"} required />
                    <span
                        role='button'
                        onClick={() => {
                            setShowPassword(!showPassword)
                        }}>
                        {
                            showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />
                        }
                    </span>
                    <label>Password</label>
                </div>
                <div>
                    <input type="submit" value={loading ? "Wait..." : signin ? "Sign in" : "Sign up"} disabled={loading} />
                    <span onClick={() => setSignin(!signin)}>{signin ? "Create an account!" : "Already have an account?"}</span>
                </div>
            </form>
            <div className='g_auth'>
                <button onClick={handelGAuth}>Login with google</button>
            </div>
        </div>
    )
}

export default Auth