import './Qarzdor.scss'
import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import $api from "../../api";
import {Slide, toast, ToastContainer} from "react-toastify";

const Qarzdor = () => {

    // data
    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setResult] = useState({
        isFetched: false,
        data: [],
        error: null
    })

    // add debt
    const [openModal, setOpenModal] = useState(false)
    const debtPrice = useRef()
    const description = useRef()
    async function confirmAddDebt(e) {
        e.preventDefault()
        let item = {
            debtorId: id,
            debtPrice: debtPrice.current.value,
            description: description.current.value
        }
        if (debtPrice.current.value !== undefined && description.current.value.length > 0) {
            try {
                await $api
                    .post('/api/debt/v1/debt-controller/add-debt',
                        JSON.stringify(item),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    )
                toast.success('Qoshildi !', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(item)
            } catch (err) {
                console.log(err)
            }
            setOpenModal(false)
        } else {
            console.log('error')
        }
    }

    // recover debt
    const [recoverModal, setRecoverModal] = useState(false)
    const reDebtPrice = useRef()
    const reDescription = useRef()
    async function confirmRecoverDebt(e) {
        e.preventDefault()
        let item = {
            debtorId: id,
            debtPrice: reDebtPrice.current.value,
            description: reDescription.current.value
        }
        if (reDebtPrice.current.value !== undefined && reDescription.current.value.length > 0) {
            try {
                await $api
                    .post('api/debt/v1/debt-controller/debt-recovery',
                        JSON.stringify(item), {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    )
                toast.success('Qoshildi !', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (err) {
                console.log(err)
            }
            setRecoverModal(false)
        } else {
            console.log('error')
        }
    }

    // delete debt
    const [confirmBtn, setConfirmBtn] = useState(false)
    const [debtId, setDebtId] = useState('')
    function confirmDeleteDebt(e) {
        setConfirmBtn(true)
        setDebtId(e)
    }
    function deleteDebt() {
        try {
            $api
                .delete(`/api/debt/v1/debt-controller/delete-debt/${debtId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(function (res) {
                    console.log(res)
                    setConfirmBtn(false)
                    toast.success('Ochirildi !', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        } catch (err) {
            console.log(err)
        }
    }

    // get archive
    const [archive, setArchive] = useState(false)
    const [archiveCount, setArchiveCount] = useState(0)
    const getArchive = () => {
        try {
            $api
                .post(`/api/debt/v1/archive?debtor-id=${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(function () {
                    setArchive(false)
                })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        $api
            .get(`/api/debt/v1/archive/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(function (res) {
                setArchiveCount(res.data.data.length)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [recoverModal, result])

    // get data
    useEffect(() => {
        $api
            .get(`/api/debt/v1/debt-controller/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(function (res) {
                setResult({
                    isFetched: true,
                    data: res.data,
                    error: false
                })
                console.log(result)
            })
            .catch(function (err) {
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
            })
    }, [openModal, confirmBtn, debtId, id, archive, recoverModal])

    // format price
    const formatPrice = Intl.NumberFormat('de-DE');

    // format phone number
    function formatPhone(str) {
        const mask = '+### (##) ###-##-##'
        if (!mask) return str;

        const numeric = str.replaceAll(/[^\d]/g, '');

        let idx = 0;

        const formated = mask.split('').map(el => {
            if (el === '#') {
                el = numeric[idx];
                idx++;
            }
            return el;
        });

        return formated.join('');
    }

    console.log(result)

    return (
        <div className='single'>
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
                {
                    archive &&
                    <div className='modal'>
                        <div className="form conf-btns">
                            <p className='title'>Arxivlashni xoxlaysizmi ?</p>
                            <div className='wrapper row center'>
                                <button className='btn confirm' onClick={getArchive}>
                                    <i className="fa-solid fa-check icon"/>
                                </button>
                                <button className='btn cancel' onClick={() => setArchive(false)}>
                                    <i className="fa-solid fa-xmark icon"/>
                                </button>
                            </div>
                        </div>
                        <div className="bg" onClick={() => setArchive(false)}/>
                    </div>
                }
                {
                    openModal &&
                    <div className='modal'>
                        <form className="form">
                            <input className='form__inp inp' ref={debtPrice} type="number" placeholder='Qarz miqdori . . .' required/>
                            <textarea className='form__inp area' ref={description} placeholder='Nimadir deb yozib keting . . .' required/>
                            <button className='form__btn' onClick={confirmAddDebt}>Tasdiqlash</button>
                        </form>
                        <div className="bg" onClick={() => setOpenModal(false)}/>
                    </div>
                }
                {
                    recoverModal &&
                    <div className='modal'>
                        <form className="form">
                            <input className='form__inp inp' ref={reDebtPrice} type="number" placeholder='Qarz miqdori . . .' required/>
                            <textarea className='form__inp area' ref={reDescription} placeholder='Nimadir deb yozib keting . . .' required/>
                            <button className='form__btn' onClick={confirmRecoverDebt}>Tasdiqlash</button>
                        </form>
                        <div className="bg" onClick={() => setRecoverModal(false)}/>
                    </div>
                }
                {
                    confirmBtn &&
                    <div className='modal'>
                        <div className="form conf-btns">
                            <p className='title'>Tasdiqlang !</p>
                            <div className='wrapper row center'>
                                <button className='btn confirm' onClick={deleteDebt}>
                                    <i className="fa-solid fa-check icon"/>
                                </button>
                                <button className='btn cancel' onClick={() => setConfirmBtn(false)}>
                                    <i className="fa-solid fa-xmark icon"/>
                                </button>
                            </div>
                        </div>
                        <div className="bg" onClick={() => setConfirmBtn(false)}/>
                    </div>
                }
            </>
            <div className="container">
                {
                    result.error === false ? (
                        <div className="single__inner">
                            <h2 className="single__title">Qarzdor - { result.data.data.firstName + ' ' + result.data.data.lastName }</h2>
                            <div className="content">
                                <div className="content__head row between align-center">
                                    <div className='row align-center'>
                                        <div className='content__icon'>
                                            <i className="fa-regular fa-user icon"/>
                                        </div>
                                        <div>
                                            <h3 className="content__title">{ result.data.data.firstName + ' ' + result.data.data.lastName + ' ' + result.data.data.patron }</h3>
                                            <span className='content__pos'>{ result.data.data.debtPrice === null ? 'Qarzdor emas' : 'Qarzdor' }</span>
                                        </div>
                                    </div>
                                    <div className='archives row'>
                                        <Link to={`/archive/${id}`} className='archives__btn counted'>
                                            <span className='count'>
                                                <span>{ archiveCount }</span>
                                            </span>
                                            <i className="fa-solid fa-box-archive icon"/>
                                        </Link>
                                        <button className={`archives__btn ${result.data.data.debts.length < 1 ? 'cursor-not' : ''}`} onClick={() => result.data.data.debts.length > 0 && setArchive(true)}>
                                            <i className="fa-solid fa-file-zipper icon"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="content__body body">
                                    <div>
                                        <div className='body__infos row phone'>
                                            <span className='body__label'>Adresi:</span>
                                            <span className='body__info tel'>{ result.data.data.address ? result.data.data.address : 'yoq' }</span>
                                        </div>
                                        <div className='body__infos row phone'>
                                            <span className='body__label'>Tel raqam:</span>
                                            <span className='body__info tel'>{ formatPhone(result.data.data.phoneNumber) }</span>
                                        </div>
                                        <div className='body__infos row phone'>
                                            <span className='body__label'>Ish joyi:</span>
                                            <span className='body__info tel'>{ result.data.data.workPlace ? result.data.data.workPlace : 'yoq' }</span>
                                        </div>
                                        <div className='body__infos row'>
                                            <span className='body__label'>Passport seriya:</span>
                                            <span className='body__info passport'>{ result.data.data.passportNumber }</span>
                                        </div>
                                        <div className='body__infos row'>
                                            <span className='body__label'>Umumiy qarzlar soni:</span>
                                            <span className='body__info num'>{ result.data.data.debts.length } ta</span>
                                        </div>
                                        <div className='body__infos row align-center info-btn'>
                                            <div className='info-btn__inner row'>
                                                <span className='body__label'>Hozirgi qarz miqdori:</span>
                                                <span className='body__info money add'>{ result.data.data.debtPrice === null ? 'Yoq' : formatPrice.format(result.data.data.debtPrice) } sum</span>
                                            </div>
                                            <button className='add-money' onClick={() => setOpenModal(true)}>
                                                <i className="fa-solid fa-plus icon"/>
                                            </button>
                                        </div>
                                        <div className='body__infos row align-center'>
                                            <div className='row'>
                                                <span className='body__label'>Tolangan qarz miqdori:</span>
                                                <span className='body__info money'>{ formatPrice.format(result.data.data.debtRecovery) } sum</span>
                                            </div>
                                            <button className='add-money' onClick={() => setRecoverModal(true)}>
                                                <i className="fa-solid fa-plus icon"/>
                                            </button>
                                        </div>
                                        <div className='body__infos row'>
                                            <span className='body__label'>Umumiy qarz miqdori:</span>
                                            <span className='body__info money'>{ formatPrice.format(result.data.data.debts.reduce((a, b) => { return a + b.debtPrice }, 0)) } sum</span>
                                        </div>
                                    </div>
                                    <div className='body__qarz qarzlar'>
                                        <h4 className="qarzlar__title">{ result.data.data.firstName + ' ' + result.data.data.lastName }<span>ning oldingi qarzlari:</span></h4>
                                        <ul className="qarzlar__list">
                                            {
                                                result.data.data.debts.length > 0 ? (
                                                    result.data.data.debts.map(item => (
                                                        <li className={`qarzlar__item row between align-center ${item.status === 'OUT' ? 'status-red' : 'status-green'}`} key={item.id}>
                                                            <div className='wrapper row'>
                                                                <div className="qarzlar__diver row">
                                                                    <span className='body__label'>Sanasi:</span>
                                                                    <time className='body__info money' dateTime={item.createdAt}>{ new Date(item.createdAt).toLocaleString().slice(0, 17) }</time>
                                                                </div>
                                                                <div className="qarzlar__diver row">
                                                                    <span className='body__label'>Miqdori:</span>
                                                                    <span className='body__info money'>{ formatPrice.format(item.debtPrice) } sum</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className={`btn`} onClick={() => confirmDeleteDebt(item.id)}>
                                                                    <i className="fa-regular fa-trash-can icon"/>
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (<p className='loading'>Qarzlar yoq . . .</p>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (<p className='loading'>Loading . . .</p>)
                }
            </div>
        </div>
    );
};

export default Qarzdor;
