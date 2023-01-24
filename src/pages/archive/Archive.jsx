import './Archive.scss'
import React, {useEffect, useState} from 'react';
import $api from "../../api";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArchiveId from "./ArchiveId";
import ArchiveItem from "./ArchiveItem";

const Archive = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setResult] = useState({
        isFetched: false,
        data: [],
        error: null
    })
    useEffect(() => {
            $api
                .get(`/api/debt/v1/archive/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(function (res) {
                    setResult({
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
    console.log(result)

    return (
        <div className='archive'>
            <div className="container">
                <div className="archive__inner">
                    <h2 className="archive__title">Arxiv</h2>
                    <div className="archive__content content">
                        <ul className='content__list row'>
                            {
                                result.error === false ?
                                result.data.map(i => (
                                    i.archives.length >= 1 &&
                                    <ArchiveItem i={i} />
                                )) : <p className='loading'>Loading . . .</p>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archive;
