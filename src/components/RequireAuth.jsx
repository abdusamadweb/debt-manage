import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Home from "../pages/home/Home";

const RequireAuth = () => {

    const location = useLocation()

    const values = Object.keys(localStorage);
    const token = localStorage.getItem('token')
    const decoded = values.includes('token') && jwtDecode(token);



    return (
         values.includes('token') ?
            decoded.role_name === 'ROLE_DIRECTOR' ? <Outlet />
                : decoded.role_name === 'ROLE_ADMIN' ? <Outlet />
                    : decoded.role_name === 'ROLE_MANAGER' ? <Home />
                        : <Navigate from='/' to='/sign-in' state={{from: location}} replace />
            : <Navigate from='/' to='/sign-in' state={{from: location}} replace />
    );
}

export default RequireAuth;
