import './SignIn.scss'
import signImg from '../../assets/images/sign-img.svg'

import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import $api from "../../api";
import {ToastContainer, toast, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {

    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function signIn(e) {
        e.preventDefault()
        let item = { username, password }
        try {
            const response = await $api
                .post('/api/debt/v1/auth-controller/sign-in',
                JSON.stringify(item),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            const accessToken = response.data.data.accessToken;
            setAuth({ username, password, accessToken })
            localStorage.setItem("token", accessToken)
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                toast.error('No Server Response', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (err.response?.status === 400) {
                toast.error('Missing Username or Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Login Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <div className='sign row'>
            <ToastContainer
                transition={Slide}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="sign__imgs">
                <img className="sign__img" src={signImg} alt="sign-img"/>
            </div>
            <div className="sign__body body">
                <div className="body__inner">
                    <h2 className='body__title'>Sign in</h2>
                    <form className='body__form form'>
                        <label>
                            <span className='form__label'>User name</span>
                            <input className='form__inp' onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Type your user name . . .' autoComplete='false' required/>
                        </label>
                        <label>
                            <span className='form__label'>Password</span>
                            <input className='form__inp' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Type your password . . .' autoComplete='false' required/>
                        </label>
                        <button className='form__btn' onClick={signIn}>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
