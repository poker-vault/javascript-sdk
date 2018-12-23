import axios from 'axios';
import { Toast } from 'buefy';
import store from '../store';

export default function setup() {
    axios.defaults.baseURL = '/api/';

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
        if (
            !error ||
            !error.response ||
            error.response.status === 500
        ) {
            Toast.open({
                duration: 5000,
                message: 'Something\'s not good, the development team has just been notified.',
                position: 'is-bottom',
                type: 'is-danger'
            });
        }

        return Promise.reject(error);
    });
}
