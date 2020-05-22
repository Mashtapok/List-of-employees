import {combineReducers, compose, createStore} from "redux";
import {tableReducer} from "./reducers/tableReducer";


const reducers = combineReducers({
    table: tableReducer
});

export const store = createStore(reducers, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
