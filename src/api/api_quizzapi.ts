import axios from 'axios';
import authorization from './authorization';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL_QUIZAPI,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': authorization.token_quizzapi
        //'Access-Control-Allow-Origin': '*',
        //'User-Agent': 'CuriousNiko - Web - Version 0.1 - www.curiousniko.com.br'
    }
});