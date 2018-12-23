import axios from 'axios';

export default {
    getAllBlinds() {
        return axios.get('/blinds');
    },
};


