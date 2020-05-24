import axios from "axios";

export const workersAPI = {
    createWorker(worker) {
        return  axios.post(`https://workers-list-task.firebaseio.com/workers.json`, worker).then(response => {
            return response.data
        })
    },
    requestUsers(workers) {
        return axios.get(`https://workers-list-task.firebaseio.com/workers.json`).then(response => {
            return response.data
        })
    },
    deleteWorker(worker) {
        return axios.delete(`https://workers-list-task.firebaseio.com/workers.json`).then(response => {
            return response.data
        })
    },
    updateWorker(worker) {
        return axios.patch(`https://workers-list-task.firebaseio.com/workers.json`, worker).then(response => {
            return response.data
        })
    },
};