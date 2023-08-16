import axios from 'axios';

class ListDataService {

    getLists(userId) {

    }

    updateList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/lists`, data);
    }

    deleteList(userId, listId) {

    }
}

export default new ListDataService();