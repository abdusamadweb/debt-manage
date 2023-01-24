import './Qarzdorlar.scss'
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import $api from "../../api";

const Qarzdorlar = () => {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [data, setData] = useState({
        isFetched: false,
        data: [],
        error: null
    })

    const [load, setLoad] = useState(0)

    useEffect(() => {
        $api
            .get(`/api/debt/v1/debt-controller/get-all-filter-by?&page=${load}&size=10&q=${search}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(function (res) {
                setData({
                    isFetched: true,
                    data: res.data.data,
                    error: false
                })
            })
            .catch(function (err) {
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
            })
    }, [load, search])
    const searchedData = (e) => {
        setLoad(0)
        setTimeout(() => {
            setSearch(e.target.value)
        }, 500)
    }

    // format price
    const formatPrice = Intl.NumberFormat('de-DE');

    return (
        <div className='qarz'>
            <div className="container">
                <div className="qarz__inner">
                    <div className='qarz__titles row between align-center'>
                        <h2 className="qarz__title">Qarzdorlar</h2>
                        <Link className="qarz__btn row align-center" to='/add-qarz'>
                            <i className="fa-regular fa-plus icon"/>
                            <span className='txt'>Qarzdor qoshish</span>
                        </Link>
                    </div>
                    <div className="qarz__content content">
                        <div className='content__info'>
                            <div className="content__head row align-center">
                                <form className="content__form form">
                                    <label>
                                        <i className="fa-solid fa-magnifying-glass icon"/>
                                        <input className='form__inp' onChange={searchedData} type="text" placeholder='Qarzdorni qidiring . . .'/>
                                    </label>
                                </form>
                                <div className='content__date'>
                                    <span>Address:</span>
                                </div>
                                <div className='content__date'>
                                    <span>Date:</span>
                                </div>
                                <div className='content__date'>
                                    <span>Money:</span>
                                </div>
                            </div>
                            <div className="content__body">
                                <ul className="content__list">
                                    {
                                        data.error === false ? (
                                            data.data.length > 0 ?
                                                data.data
                                                    .map((item, i) => (
                                                        <li className='content__item item row between align-center' key={i}>
                                                            <Link className='item__titles row align-center' to={`/qarzdorlar/${item.id}`}>
                                                                <div className='inner'>
                                                                    <div className='wrapper row between'>
                                                                        <h3 className="item__title">{ item.lastName } { item.firstName }</h3>
                                                                        <span className='item__job'>Manager</span>
                                                                    </div>
                                                                </div>
                                                                <span className='item__txt'>Bildirish 12 uy shayxontaxur</span>
                                                                <time className='item__txt time' dateTime={item.date}>{ new Date(item.createdAt).toLocaleString().slice(0, 17) }</time>
                                                                <span className='item__txt money'><span>{ formatPrice.format(item.debtPrice) }</span> sum</span>
                                                            </Link>
                                                            <div className='item__icons row'>
                                                                <Link className='btn' to={`/edit-qarz/${item.id}`}>
                                                                    <i className="fa-solid fa-pen icon"/>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    )) : <p className='loading error'>No data !</p>
                                        ) : (
                                            <p className='loading'>Loading . . .</p>
                                        )
                                    }
                                    {
                                        data.error === false &&
                                        <div className='row'>
                                            <button className='load-btn' onClick={() => load > 0 && setLoad(load - 1)}>
                                                <i className="fa-solid fa-chevron-left icon"/>
                                            </button>
                                            <button className='load-btn' onClick={() => setLoad(load + 1)}>
                                                <i className="fa-solid fa-chevron-right icon"/>
                                            </button>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Qarzdorlar;
