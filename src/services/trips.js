import axios from 'axios';

class TripDataService {

    getTrips(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${userId}`);
    }

    updateTrip(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/trips`, data);
    }

    deleteTrip(userId, tripId) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${userId}/${tripId}`);
    }
}

export default new TripDataService();