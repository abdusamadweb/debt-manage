import axios from 'axios';

const API_URL = `http://185.217.131.200:8080/`

const $api = axios.create({
    baseURL: API_URL,
});

export default $api