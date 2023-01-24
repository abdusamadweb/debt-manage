import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {

    const { setAuth, auth } = useAuth()

    const location = useLocation()

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);

    console.log(decoded)

    return (
        // token !== false && decoded.role_name === 'ROLE_DIRECTOR' ? <Outlet />
        //     : token && decoded.role_name === 'ROLE_ADMIN' ? <Profile />
        //         : token && decoded.role_name === 'ROLE_MANAGER' ? <Home />
        //             : <Navigate from='/' to='/sign-in' state={{from: location}} replace />
        auth?.username ? <Outlet /> : <Navigate to='/sign-in' />
    );
}

export default RequireAuth;
