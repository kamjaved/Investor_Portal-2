import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import error from "./errorsReducer";
import expense from "./expenseReducer";
import investment from "./investmentReducer";
import ration from "./rationReducer";
import accPay from "./accPayReducer";
import upiPay from "./upiPayReducer";
import whatgroup from "./whatsGroupReducer";
import setting from "./settingReducer";
import grocery from "./groceryReducer";
import city from "./cityReducer";
import area from "./areaReducer";
import contactus from './ContactUsReducer';
import kitreq from './KitReqreducer'
import organisation from './OrgReducer'

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
  city,
  area,
  organisation,
  contactus,
  kitreq,

});
