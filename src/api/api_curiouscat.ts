import axios from 'axios';

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export default axios.create({
    baseURL: process.env.REACT_APP_API_URL_CURIOUSCAT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Access-Control-Allow-Origin': '*',
        //'User-Agent': 'CuriousNiko - Web - Version 0.1 - www.curiousniko.com.br'
    }
});