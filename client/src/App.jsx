import './App.css'
import axios from "axios"
import Auth from './pages/Auth';

axios.defaults.baseURL = `http://localhost:8080`;

function App() {

  return (
    <>
      <Auth />
    </>
  )
}

export default App
