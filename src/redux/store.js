import {applyMiddleware, combineReducers, createStore} from "redux";
import {tableReducer} from "./reducers/tableReducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


const reducers = combineReducers({
    table: tableReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
