import defaultPhoto from "../../assets/defaultPhoto.png";
import {workersAPI} from "../../api/api";

const REMOVE_WORKER = "table/REMOVE_WORKER";
const ADD_WORKER = "table/ADD_WORKER";
const EDIT_WORKER = "table/EDIT_WORKER";
const UPDATE_WORKER = "table/UPDATE_WORKER";
const SET_WORKERS = "table/SET_WORKERS";
const WORKERS_IS_LOADING = "table/WORKERS_IS_LOADING";

const initialState = {
    workers: [],
    editableWorker: {},
    workersIsLoading : false,
};

function getCurrentAge(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_WORKER:
            return {...state, workers: state.workers.filter(worker => worker.id !== action.payload)};
        case EDIT_WORKER:
            return {
                ...state,
                editableWorker: state.workers.find(worker => worker.id === action.payload)
            };
        case UPDATE_WORKER:
            let newAge = getCurrentAge(new Date(action.payload.birthday));
            return {
                ...state,
                workers: state.workers.map(worker => {
                        if (worker.id === action.payload.id) {
                            return {...action.payload, age: newAge}
                        }
                        return worker
                    }
                )
            };
        case SET_WORKERS:
            return  {...state, workers: action.payload};
        case WORKERS_IS_LOADING:
            return {...state, workersIsLoading: action.payload};
        default:
            return state;

    }
};

//ActionCreators
export const removeWorker = (id) => ({type: REMOVE_WORKER, payload: id});
export const setWorkersSuccess = (workers) => ({type: SET_WORKERS, payload: workers});
export const editWorker = (id) => ({type: EDIT_WORKER, payload: id});
export const updateWorker = (formData) => ({type: UPDATE_WORKER, payload: formData});
export const workersIsLoading = (isLoading) => ({type: WORKERS_IS_LOADING, payload: isLoading});

// ThunkCreators
export const addWorkerThunk = (worker) => async dispatch => {
    let birthdayDate = new Date(worker.birthday);
    const formatWorker = {
        id: Date.now(),
        photo: defaultPhoto,
        name: worker.name,
        surname: worker.surname,
        birthday: worker.birthday,
        age: getCurrentAge(birthdayDate),
        position: worker.position,
        remoteWork: worker.remoteWork,
        city: worker.city,
        street: worker.street,
        house: worker.house,
        flat: worker.flat,
    };
    let data = await workersAPI.createWorker(formatWorker);
    requestWorkersThunk();
};
export const requestWorkersThunk = () => async dispatch => {
    dispatch(workersIsLoading(true));
const workers = [];
    let data = await workersAPI.requestUsers();
    for(let worker in data) {
        if(data.hasOwnProperty(worker)) {
            workers.push(data[worker]);
        }
    }
    dispatch(setWorkersSuccess(workers));
    dispatch(workersIsLoading(false));
    return workers
};