import './App.css'
import axios from "axios"
import AllRoutes from "./routes/AllRoutes"
// import { useEffect, useState } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const res = await axios(`/auth/login/success`);
  //     const { data } = await res.data;
  //     setUser(data.user._json);
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getUser();
  // }, [])

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
