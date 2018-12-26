import axios from 'axios';

export default {
    getUser(userId) {
        return axios.get(`/users/${userId}`);
    },

    login(email, password) {
        return axios.post('/auth/login', {
            email,
            password
        })
    }
};
