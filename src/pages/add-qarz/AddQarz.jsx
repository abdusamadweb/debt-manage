import './AddQarz.scss'
import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import $api from "../../api";
import {Slide, toast, ToastContainer} from "react-toastify";

const AddQarz = () => {

    const navigate = useNavigate()

    const firstName = useRef()
    const lastName = useRef()
    const patron = useRef()
    const passportNumber = useRef()
    const phoneNumber = useRef()
    const debtPrice = useRef()
    const description = useRef()
    const address = useRef()
    const workPlace = useRef()
    const passportImg = useRef()
    const profileImg = useRef()

    async function addDebtor(e) {
        e.preventDefault()
        let item = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            patron: patron.current.value,
            passportNumber: passportNumber.current.value,
            phoneNumber: phoneNumber.current.value,
            debtPrice: debtPrice.current.value,
            description: description.current.value,
            address: address.current.value,
            workPlace: workPlace.current.value,
        }
        if (item.firstName !== '' && item.lastName !== '' && item.patron !== '' && item.passportNumber !== '' && item.phoneNumber !== '' && item.debtPrice !== '' && item.description !== '' && item.address !== '' && item.workPlace !== '') {
            try {
                const response = await $api
                    .post('/api/debt/v1/debt-controller',
                        JSON.stringify(item),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                navigate('/qarzdorlar', { replace: true });
                console.log(response.data.data)
            } catch (err) {
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


    return (
        <div className='add-qarz'>
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
                <div className="add-qarz__inner">
                    <h2 className="add-qarz__title">Qarzdor qoshish</h2>
                    <div className="add-qarz__content content">
                        <h3 className="content__title">Qarz opsiyalarini toldiring:</h3>
                        <form className="content__form form">
                            <div className="row wrapper">
                                <div>
                                    <label>
                                        <span className='form__label'>Ism</span>
                                        <input className='form__inp' ref={firstName} type="text" placeholder='First name . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Familiya</span>
                                        <input className='form__inp' ref={lastName} type="text" placeholder='Second name . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Otangiz ismi</span>
                                        <input className='form__inp' ref={patron} type="text" placeholder='Patron . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Address</span>
                                        <input className='form__inp' ref={address} type="text" placeholder='Address . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Pasport seriya</span>
                                        <input className='form__inp' ref={passportNumber} type="text" placeholder='Serie of passport . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Pasport rasm</span>
                                        <input className='form__inp' type="file" placeholder='Passport image . . .'/>
                                    </label>
                                </div>
                                <div className='without'>
                                    <label>
                                        <span className='form__label'>Profil rasm</span>
                                        <input className='form__inp' type="file" placeholder='Passport image . . .'/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Telefon raqam</span>
                                        <input className='form__inp' ref={phoneNumber} type="number" placeholder='You phone number . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Ish joyi</span>
                                        <input className='form__inp' ref={workPlace} type="text" placeholder='Your work place . . .' required/>
                                    </label>
                                    <label>
                                        <span className='form__label'>Pul miqdori</span>
                                        <input className='form__inp second' ref={debtPrice} type="number" placeholder='Money . . .' required/>
                                    </label>
                                    <label className='last'>
                                        <span className='form__label'>Description</span>
                                        <textarea className='form__inp second text-area' ref={description} placeholder='Nimadir deb yozib keting . . .'></textarea>
                                    </label>
                                </div>
                            </div>
                            <button className='form__btn' onClick={addDebtor}>Saqlash</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQarz;
