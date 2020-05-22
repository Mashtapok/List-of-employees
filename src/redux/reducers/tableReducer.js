import defaultPhoto from "../../assets/defaultPhoto.png";

const REMOVE_WORKER = "table/REMOVE_WORKER";
const ADD_WORKER = "table/ADD_WORKER";
const TOGGLE_CHECKBOX = "table/TOGGLE_CHECKBOX";
const EDIT_WORKER = "table/EDIT_WORKER";
const UPDATE_WORKER = "table/UPDATE_WORKER";

const initialState = {
    workers: [
        {
            id: 1,
            photo: defaultPhoto,
            name: "Степан",
            surname: "Иванов",
            birthday: "1999-05-05",
            age: 21,
            position: "Junior",
            remoteWork: true,
            city: "Калининград",
            street: "Штурберта",
            house: "16",
            flat: "4"
        },
        {
            id: 2,
            photo: defaultPhoto,
            name: "Сергей",
            surname: "Петров",
            birthday: "1968-11-13",
            age: 58,
            position: "Middle",
            remoteWork: false,
            city: "Москва",
            street: "Пушкина",
            house: "1",
            flat: "1"
        },
        {
            id: 3,
            photo: defaultPhoto,
            name: "Костя",
            surname: "Иванов",
            birthday: "2000-06-06",
            age: 20,
            position: "Senior",
            remoteWork: false,
            city: "Петербург",
            street: "Невская",
            house: "142",
            flat: ""
        },
        {
            id: 4,
            photo: defaultPhoto,
            name: "Михаил",
            surname: "Медведев",
            birthday: "1994-01-06",
            age: 26,
            position: "Lead",
            remoteWork: true,
            city: "Петербург",
            street: "Московская",
            house: "225",
            flat: "1"
        },
    ],
    editableWorker: {},
};

function getCurrentAge(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_WORKER:
            return {...state, workers: state.workers.filter(worker => worker.id !== action.payload)};
        case ADD_WORKER:
            let formData = action.payload;
            let birthdayDate = new Date(formData.birthday);

            let newState = {
                id: Date.now(),
                photo: defaultPhoto,
                name: formData.name,
                surname: formData.surname,
                birthday: formData.birthday,
                age: getCurrentAge(birthdayDate),
                position: formData.position,
                remoteWork: formData.remoteWork,
                city: formData.city,
                street: formData.street,
                house: formData.house,
                flat: formData.flat,
            };
            return {
                ...state,
                workers: [...state.workers, newState]
            };
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                workers: state.workers.map(worker =>
                    (worker.id === action.payload ? {...worker, remoteWork: !worker.remoteWork} : worker
                    ))
            };
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
        default:
            return state;

    }
};

//ActionCreators
export const removeWorker = (id) => ({type: REMOVE_WORKER, payload: id});
export const addWorker = (formData) => ({type: ADD_WORKER, payload: formData});
export const toggleCheckbox = (id) => ({type: TOGGLE_CHECKBOX, payload: id});
export const editWorker = (id) => ({type: EDIT_WORKER, payload: id});
export const updateWorker = (formData) => ({type: UPDATE_WORKER, payload: formData});