import axios from 'axios';
import i18n from 'i18next';
import { message } from 'antd';

export default async (
    url,
    method,
    data = null,
    options = {},
    baseUrl = process.env.REACT_APP_API_HOST,
    displayErrorMessages = true,
) => {
    try {
        const { data: res } = await axios({
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
        return res;
    } catch (error) {
        if (!error.response && displayErrorMessages) {
            message.error(i18n.t('genericError'));
        } else if (displayErrorMessages) {
            let action;
            switch (error.response.status) {
                case 404:
                    action = 'warning'
                    break;
                default:
                    action = 'error';
                    break;
            }
            message[action](error.response.data.message);
        }
        throw error;
    }
}