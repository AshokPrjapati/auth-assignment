import './App.css'
import axios from "axios"
import AllRoutes from "./routes/AllRoutes"

axios.defaults.baseURL = `http://localhost:8080`;

function App() {

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
