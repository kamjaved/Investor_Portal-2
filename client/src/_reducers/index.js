import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import error from './errorsReducer'
import expense from './expenseReducer'
import investment from './investmentReducer'
import ration from './rationReducer'


export default combineReducers({
    auth,
    alert,
    error,
    expense,
    investment,
    ration


})