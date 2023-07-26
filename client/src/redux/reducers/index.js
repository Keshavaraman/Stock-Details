import { combineReducers } from "redux";
import stockDataReducer from "./stockDataReducer";
import modalMessageReducer from "./modalMessageReducer";
const Reducers = combineReducers({
    stockData : stockDataReducer,
    modalMessage : modalMessageReducer
})
export default Reducers;