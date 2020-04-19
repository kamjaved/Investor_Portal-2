import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import error from './errorsReducer'
import expense from './expenseReducer'
import investment from './investmentReducer'
import ration from './rationReducer'
import accPay from './accPayReducer'
import upiPay from './upiPayReducer'
import whatgroup from './whatsGroupReducer'
import setting from './settingReducer'
import grocery from './groceryReducer'





export default combineReducers({
    auth,
    alert,
    error,
    expense,
    investment,
    ration,
    accPay,
    upiPay,
    whatgroup,
    grocery,
    setting,


})