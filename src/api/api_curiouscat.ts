import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL_CURIOUSCAT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'RefeiçaoFree - Web - Version 0.1 - www.refeicaofree.com.br'
    }
});