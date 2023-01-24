import './Home.scss'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import $api from "../../api";

const Home = () => {

    const navigate = useNavigate()
    const [result, setResult] = useState({
        isFetched: false,
        data: [],
        error: null
    })

    // get api
    useEffect(() => {
        $api
            .get(`/api/debt/v1/debt-controller/get-all-filter-by?&size=100`, {
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
            })
            .catch(function (err) {
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
            })
    }, [])

    const [d, sd] = useState({
        isFetched: false,
        data: [],
        error: null
    })
    useEffect(() => {
        $api
            .get(`/api/debt/v1/dashboard`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(function (res) {
                sd({
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
    }, [])

    // filter results
    const today = new Date()
    const [filteredData, setFilteredData] = useState([])
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [calendar, setCalendar] = useState(false)
    fromDate.setHours(0,0,0,)
    fromDate.getTime()
    toDate.setHours(23,59,59,)
    toDate.getTime()
    useEffect(() => {
        const getFilterData = () => {
            if (result.error === false) {
                let res = result.data.data.filter(i => {
                    const time = new Date(i.createdAt);
                    return (fromDate <= time && time <= toDate);
                });
                console.log(res)
                setFilteredData(res)
            } else {
                console.log('err')
            }
        }
        getFilterData()
    }, [result, fromDate, toDate, calendar])

    // format price
    const formatPrice = Intl.NumberFormat('de-DE');

    // to from available debts
    const [nowTolaganDebts, setNowTolaganDebts] = useState(0)
    const [nowTolamaganDebts, setNowTolamaganDebts] = useState(0)
    useEffect(() => {
        const getNowPayDebtors = () => {
            let tolagan = 0
            let tolamagan = 0
            filteredData.map(i => {
                if (i.debtPrice !== 0) {
                    tolamagan++
                    return setNowTolamaganDebts(tolamagan)
                } else {
                    tolagan++
                    return setNowTolaganDebts(tolagan)
                }
            })
        }
        getNowPayDebtors()
    }, [filteredData])

    // total debts
    const [tolaganDebtors, setTolaganDebtors] = useState(0)
    const [tolamaganDebtors, setTolamaganDebtors] = useState(0)
    useEffect(() => {
        const getPayDebtors = () => {
            let tolagan = 0
            let tolamagan = 0
            if (result.error === false) {
                result.data.data.map(i => {
                    if (i.debtPrice !== 0) {
                        tolamagan++
                        return setTolamaganDebtors(tolamagan)
                    } else {
                        tolagan++
                        return setTolaganDebtors(tolagan)
                    }
                })
            }
        }
        getPayDebtors()
    }, [result])

    const [s, ss] = useState({
        isFetched: false,
        data: [],
        error: null
    })
    useEffect(() => {
        $api
            .get(`/api/debt/v1/dashboard`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    fromDate: fromDate.getTime(),
                    toDate: toDate.getTime()
                }
            })
            .then(function (res) {
                ss({
                    isFetched: true,
                    data: res.data.data,
                    error: false
                })
            })
            .catch(function (err) {
                console.log(err)
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
            })
    }, [fromDate, toDate, calendar])
    console.log(s, fromDate.getTime(), toDate.getTime())

    return (
        <div className='home'>
            <div className="container">
                <div className="home__inner">
                    <h2 className="home__title">Dashboard</h2>
                    <div className="home__content content">
                        <div className='content__wrapper'>
                            <div className='content__titles row between align-center relative-p'>
                                <h3 className="content__title">{ fromDate.toLocaleDateString() === today.toLocaleDateString() && toDate.toLocaleDateString() === today.toLocaleDateString() ? 'Bugungi:' : (fromDate.toLocaleDateString() + ' ~ ' + toDate.toLocaleDateString()) }</h3>
                                <button className='content__filter' onClick={() => setCalendar(!calendar)}>
                                    <i className="fa-solid fa-filter icon"/>
                                </button>
                                <div className={`calendar ${calendar ? 'open' : 'close'}`}>
                                    <div className="row">
                                        <div className='calendar__content'>
                                            <span className='txt'>. . . dan</span>
                                            <Calendar
                                                onChange={setFromDate}
                                                value={fromDate}
                                            />
                                        </div>
                                        <div className='calendar__content'>
                                            <span className='txt'>. . . gacha</span>
                                            <Calendar
                                                onChange={setToDate}
                                                value={toDate}
                                            />
                                            <button className='btn' onClick={() => setCalendar(false)}>OK</button>
                                        </div>
                                    </div>
                                    <div className="bg" onClick={() => setCalendar(false)}/>
                                </div>
                            </div>
                            <div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzdorlar:</span>
                                    <span className='content__num num'>{ filteredData.length } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzi bor qarzdorlar:</span>
                                    <span className='content__num num'>{ nowTolamaganDebts } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzini tolaganlar:</span>
                                    <span className='content__num num'>{ nowTolaganDebts } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzlar soni:</span>
                                    <span className='content__num num'>{ '{null}' } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzlar miqdori:</span>
                                    <span className='content__num'>{ formatPrice.format(filteredData.reduce((a, b) => { return a + b.debtPrice }, 0)) } sum</span>
                                </div>
                            </div>
                        </div>
                        <div className='content__wrapper'>
                            <div className='content__titles'>
                                <h3 className="content__title">Hammasi bolib:</h3>
                            </div>
                            <div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzdorlar:</span>
                                    <span className='content__num num'>{ d.error === false ? d.data.debtors : '0' } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzlar soni:</span>
                                    <span className='content__num num'>{ d.error === false ? d.data.allDebts : '0' } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Tolanmagan qarzlar:</span>
                                    <span className='content__num num'>{ d.error === false ? d.data.debtsIn : '0' } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Tolangan qarzlar:</span>
                                    <span className='content__num num'>{ d.error === false ? d.data.debtsOut : '0' } ta</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Qarzlar miqdori:</span>
                                    <span className='content__num'>{ d.error === false ? formatPrice.format(d.data.debtsAmount, 0) : '0' } sum</span>
                                </div>
                                <div className='row between content__diver'>
                                    <span className='content__txt'>Tolangan qarzlar miqdori:</span>
                                    <span className='content__num'>{ d.error === false ? formatPrice.format(d.data.debtsPaidAmount, 0) : '0' } sum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
