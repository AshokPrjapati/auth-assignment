import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Auth from '../pages/Auth';
import Home from '../pages/Home';


function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/auth' element={<Auth />} />
        </Routes>
    )
}

export default AllRoutes

