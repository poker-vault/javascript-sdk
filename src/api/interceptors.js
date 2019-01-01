import axios from 'axios';
import store from '../store';

export default function setup(options) {
    options = options || {};

    axios.defaults.baseURL = options.baseURL || '/api/';

    axios.interceptors.request.use((config) => {
        const token = store.state.auth.token;

        config.headers.Authorization = `Bearer ${token}`;
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        config.headers.Accept = 'application/json';

        return config;
    }, err => Promise.reject(err));

    axios.interceptors.response.use((response) => {
        // noop
        return response;
    }, (error) => {
        if (options.errorCallback) {
            options.errorCallback(error);
        }

        return Promise.reject(error);
    });
}
