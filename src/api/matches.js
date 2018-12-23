import axios from 'axios';

export default {
    getAllMatches(userId) {
        return axios.get(`/users/${userId}/matches`);
    },

    create(userId, match) {
        return axios.post(`/users/${userId}/matches`, match);
    },
};

