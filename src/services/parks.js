import axios from 'axios';

class ParkDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parks?page=${page}`);
    }

    find(query, by='name', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/parks?${by}=${query}&page=${page}`
        );
    }

    getStates() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/states`);
    }

    getPark(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parks/id/${id}`);
    }
}

/*eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ParkDataService();