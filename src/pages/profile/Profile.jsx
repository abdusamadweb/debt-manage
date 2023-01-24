import './Profile.scss'
import React, {useEffect, useState} from 'react';
import $api from "../../api";
import {useNavigate} from "react-router-dom";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const Profile = () => {

    const navigate = useNavigate()

    const [me, setMe] = useState({
        data: [],
        error: null
    })
    useEffect(() => {
        $api
            .get('/api/debt/v1/user-controller/me', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(function (res) {
                setMe({
                    data: res.data.data,
                    error: false
                })
            })
            .catch(function (err) {
                setMe({
                    data: {},
                    error: err
                })
                if (err.response.status === 403) {
                    navigate('/sign-in')
                }
            })
    }, []);

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

    const [file, setFile] = useState({
        data: [],
        error: true
    })
    const [img, setImg] = useState(null)
    const sendFile = (files) => {
        const file = files[0]
        const formData = new FormData()
        formData.append('file', file)
        $api
            .post('/api/debt/v1/attachment/upload', formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(function (res) {
                setFile({
                    data: res.data.data[0],
                    error: false
                })
            })
            .catch(function (err) {
                setFile({
                    data: null,
                    error: true
                })
            })
    }
    console.log(file)

    function getImg() {
        $api
            .get(`/api/debt/v1/attachment/get/${file.data.id}`, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                responseType: "arraybuffer"
            })
            .then(function (res) {
                console.log(res.data)
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                )
                setImg(base64)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    

    return (
        <div className='profile'>
            <div className="container">
                <div className="profile__inner">
                    <h2 className="profile__title">Profile</h2>
                    <div className="profile__content content">
                        <div0 className='content__head row align-center'>
                            <div className='content__icon'>
                                <i className="fa-solid fa-user-doctor icon" onClick={getImg}/>
                            </div>
                            <div className='content__titles'>
                                <h3 className="content__title">{ me.data.fullName }</h3>
                                <h4 className="content__pos">{ me.data.roleName }</h4>
                            </div>
                        </div0>00
                        <div>
                            <img src={`data:;base64,${img}`} alt="img"/>
                            <a className='content__tel' href={`tel:${me.phoneNumber}`}>{ me.error === false && formatPhone(me.data.phoneNumber) }</a>
                            <p className='content__desc'>Siz <span>"{ me.error === false && me.data.roleName.slice(5) }"</span> faqat qarz oldi berdi jarayonini boshqara olasiz.</p>
                        </div>
                        <div>
                            <input type="file" onChange={(e) => sendFile(e.target.files)}/>
                        </div>
                    </div>
                </div>
                <Uploady
                    destination={{ url: "https://debt-managment-production.up.railway.app/api/debt/v1/attachment/upload" }}
                    accept="image/*"
                >
                    <UploadButton />
                    <UploadPreview />
                </Uploady>
            </div>
        </div>
    );
};

export default Profile;
