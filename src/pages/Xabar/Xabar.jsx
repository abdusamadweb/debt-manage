import './Xabar.scss'
import React, {useEffect, useRef, useState} from 'react';
import $api from "../../api";
import {useNavigate} from "react-router-dom";
import {Slide, toast, ToastContainer} from "react-toastify";

const Xabar = () => {

    const navigate = useNavigate()

    const titleRef = useRef()
    const textRef = useRef()
    async function sendXabar(e) {
        e.preventDefault()
        const item = {
            title: titleRef.current.value,
            text: textRef.current.value
        }
        if (item.title !== '' && item.text !== '') {
            try {
                const response = await $api
                    .post('/api/debt/v1/user-controller/sms',
                        JSON.stringify(item), {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                toast.success('Yuborildi !', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                titleRef.current.value = ''
                textRef.current.value = ''
            } catch (err) {
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
                console.log(err)
            }
        } else {
            toast.error('Toliq kiriting !', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const [result, setResult] = useState({
        isFetched: false,
        data: [],
        error: null
    })
    useEffect(() => {
        $api
            .get('/api/debt/v1/user-controller/sms', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(function (res) {
                setResult({
                    isFetched: true,
                    data: res,
                    error: false
                })
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [])
    console.log(result)

    return (
        <div className='xabar'>
            <>
                <ToastContainer
                    transition={Slide}
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </>
            <div className="container">
                <div className="xabar__inner">
                    <h2 className="xabar__title">Xabar jonatish</h2>
                    <div className="xabar__content content">
                        <h3 className="content__title">Xabaringizni kiriting:</h3>
                        <form>
                            <label>
                                <input className='content__inp' ref={titleRef} type="text" placeholder='Sarlavha . . .'/>
                            </label>
                            <label>
                                <textarea className='content__inp area' ref={textRef} placeholder='Nimadir . . .' />
                            </label>
                            <button className='content__btn' onClick={sendXabar}>Tasdiqlash</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Xabar;
