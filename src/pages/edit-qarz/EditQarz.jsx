import React, {useEffect, useRef, useState} from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams} from "react-router-dom";
import $api from "../../api";

const EditQarz = () => {

    const { auth } = useAuth()
    const { id } = useParams()
    const [result, setResult] = useState({
        isFetched: false,
        data: [],
        error: null
    })
    console.log(auth)

    useEffect(() => {
        try {
            $api
                .get(`/api/debt/v1/debt-controller/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(function (res) {
                    setResult({
                        isFetched: true,
                        data: res.data,
                        error: false
                    })
                })
        } catch (err) {
            setResult({
                isFetched: true,
                data: [],
                error: err,
            })
        }
    }, [])

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

    async function editDebtor(e) {
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
        try {
            const response = await $api
                .put('/api/debt/v1/debt-controller/delete-debtor/${id}',
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
        console.log(item)
    }

    return (
        <div className='add-qarz'>
            <div className="container">
                <div className="add-qarz__inner">
                    <h2 className="add-qarz__title">Qarz taxrirlash</h2>
                    <div className="add-qarz__content content">
                        <h3 className="content__title">Qarz opsiyalarini toldiring:</h3>
                        {
                            result.error === false ? (
                                <form className="content__form form">
                                    <div className="row wrapper">
                                        <div>
                                            <label>
                                                <span className='form__label'>Ism</span>
                                                <input className='form__inp' ref={firstName} defaultValue={result.data.data.firstName} type="text" placeholder='First name . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Familiya</span>
                                                <input className='form__inp' ref={lastName} defaultValue={result.data.data.lastName} type="text" placeholder='Second name . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Otasining ismi</span>
                                                <input className='form__inp' ref={patron} defaultValue={result.data.data.patron} type="text" placeholder='Patron . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Address</span>
                                                <input className='form__inp' ref={address} defaultValue={result.data.data.address} type="text" placeholder='Address . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Pasport seriya</span>
                                                <input className='form__inp' ref={passportNumber} defaultValue={result.data.data.passportNumber} type="text" placeholder='Serie of passport . . .' required/>
                                            </label>
                                        </div>
                                        <div className='without'>
                                            <label>
                                                <span className='form__label'>Telefon raqam</span>
                                                <input className='form__inp' ref={phoneNumber} defaultValue={result.data.data.phoneNumber} type="tel" placeholder='You phone number . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Ish joyi</span>
                                                <input className='form__inp' ref={workPlace} defaultValue={result.data.data.workPlace} type="text" placeholder='Your work place . . .' required/>
                                            </label>
                                            <label>
                                                <span className='form__label'>Pul miqdori</span>
                                                <input className='form__inp' ref={debtPrice} defaultValue={result.data.data.debtPrice} type="number" placeholder='Money . . .' required/>
                                            </label>
                                            <label className='last'>
                                                <span className='form__label'>Description</span>
                                                <textarea className='form__inp second text-area' ref={description} defaultValue={result.data.data.description} placeholder='Nimadir deb yozib keting . . .'></textarea>
                                            </label>
                                        </div>
                                    </div>
                                    <button className='form__btn' onClick={editDebtor}>Saqlash</button>
                                </form>
                            ) : (
                                <p>Loading . . .</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQarz;
