import axios from 'axios';

export default (url, method, data = null, options = {}, baseUrl = process.env.REACT_APP_API_HOST) => {
    return axios({
        method,
        url: baseUrl + url, 
        data,
        options: {
            headers: {
                ...(options.headers || {}),                  
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            ...options
        }
    })
}