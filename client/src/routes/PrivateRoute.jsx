import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"

function PrivateRoute({ children }) {
    const token = useSelector(store => store.authManager.token)

    if (token) return children;
    else return <Navigate to='/auth' />;
}

export default PrivateRoute;