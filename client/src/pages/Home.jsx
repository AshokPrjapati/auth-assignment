import '../App.css'
import { useDispatch } from "react-redux";
import { logoutAction } from '../redux/auth/auth.actions';

const Home = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutAction());
    }


    return (
        <div className={"box"}>
            <div className='g_auth'>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Home;




