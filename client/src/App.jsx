import './App.css'
import axios from "axios"
import AllRoutes from "./routes/AllRoutes"
// import { useEffect, useState } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
