import '../App.css'

const Home = () => {

    const logout = () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, "_self");
    }

    return (
        <div className={"box"}>
            <div className='g_auth'>
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

export default Home;




