import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from 'react';
import { getLoginStatus } from '../redux/auth/auth.actions';

function PrivateRoute({ children }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(store => store.authManager.isAuthenticated);

    const getStatus = useCallback(() => {
        dispatch(getLoginStatus());
    }, [isAuthenticated]);

    useEffect(() => {
        getStatus();
    }, [])

    if (isAuthenticated) return children;
    else return <Navigate to='/auth' />;
}

export default PrivateRoute;