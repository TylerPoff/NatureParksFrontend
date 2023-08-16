import axios from 'axios';

class ListDataService {

    getLists(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/lists/${userId}`);
    }

    updateList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/lists`, data);
    }

    deleteList(userId) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/lists/${userId}`);
    }
}

export default new ListDataService();