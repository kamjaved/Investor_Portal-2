import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./utils/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Alert from "./components/UI/Alert";
import Navbar from "./components/UI/navbar";
import Login from "./components/UI/Login";
//import Register from './components/UI/Register';

import DashboardMain from "./components/UI/DashboardMain";
import Profile from "./components/UI/Profile";
import AddInvestment from "./components/Investment/addInvestment";
import AddExpense from "./components/Expense/addExpense";
import ViewInvestment from "./components/Investment/viewInvestment";
import EditInvestment from "./components/Investment/editInvestment";
import ViewExpenses from "./components/Expense/viewExpenses";
import EditExpense from "./components/Expense/editExpenses";
//---REPORTS---------------
import ReportsLanding from "./components/Reports/reportsLanding";
import ViewAllInvestment from "./components/Reports/viewAllInvestment";
import ViewAllExpenses from "./components/Reports/viewAllExpenses";
import NotFound from "./components/UI/notFound";

import EditProfile from "./components/UI/editProfile";
import ForgotPassword from "./components/UI/forgotPassword";
import ResetPassword from "./components/UI/ResetPassword";
import DashboardGuest from "./components/UI/Dashboardguest";
import AddDeliveredKit from "./components/Ration/addDeliveredKit";
import ViewdeliveredKit from "./components/Ration/ViewdeliveredKit";
import EditDeliveredKit from "./components/Ration/editDeliveredKit";
import ViewAllRation from "./components/Reports/viewAllRation";
import Footer from "./components/UI/footer";
import Payment_landing from "./components/PaymentMode/payment_landing";
import AddPayAcc from "./components/PaymentMode/addPayAcc";
import AddUPI from "./components/PaymentMode/addUPI";
import ViewPayAcc from "./components/PaymentMode/viewPayAcc";
import EditPayAcc from "./components/PaymentMode/editPayAcc";
import ViewUPI from "./components/PaymentMode/viewUPI";
import EditUPI from "./components/PaymentMode/editUPI";
import PaymentLanding from "./components/Reports/PaymentMode/PaymentLanding";
import AddWhatGroup from "./components/PaymentMode/addWhatGroup";
import ViewWhatGroup from "./components/PaymentMode/viewWhatGroup";
import EditWhatGroup from "./components/PaymentMode/editWhatGroup";
import AddGrocery from "./components/Grocery/addGrocery";
import ViewGrocery from "./components/Grocery/viewGrocery";
import EditGrocery from "./components/Grocery/editGrocery";
import SettingLanding from "./components/Setting/settingLanding";
import DefaultGrocery from "./components/Setting/defaultGrocery";
import EditdefaultGrocery from "./components/Setting/editdefaultGrocery";
import AddCity from "./components/city/AddCity";
import Cities from "./components/city/Cities";
import EditCity from "./components/city/EditCity";

import AddArea from "./components/area/AddArea";
import KitReq from "./components/GuestForm/kitReq";
import ContactUs from "./components/GuestForm/contactus";
import ViewContactUs from "./components/Reports/viewContactUs";
import ViewKitReq from "./components/Reports/viewKitReq";
import OrgProfile from "./components/UI/orgProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Navbar />
          <Switch>
            <PrivateRoute path="/dashboard" component={DashboardMain} />
            <PrivateRoute path="/admin/your_profile" component={Profile} />
            <PrivateRoute path="/admin/org_profile" component={OrgProfile} />

            <PrivateRoute path="/admin/editmyprofile" component={EditProfile} />
            <PrivateRoute
              path="/admin/addinvestment"
              component={AddInvestment}
            />
            <PrivateRoute
              path={`/admin/editInvestment/:id`}
              component={EditInvestment}
            />
            <PrivateRoute path="/admin/addexpenses" component={AddExpense} />
            <PrivateRoute
              path={`/admin/editExpense/:id`}
              component={EditExpense}
            />


            <PrivateRoute path={`/admin/view-contactus`} component={ViewContactUs} />
            <PrivateRoute path={`/admin/view-kitrequest`} component={ViewKitReq} />
            <PrivateRoute path={`/admin/add-ration`} component={AddDeliveredKit} />
            <PrivateRoute path={`/admin/view-ration`} component={ViewdeliveredKit} />
            <PrivateRoute
              path={`/admin/editRation/:id`}
              component={EditDeliveredKit}
            />
            <PrivateRoute path={`/admin/add-grocery`} component={AddGrocery} />
            <PrivateRoute
              path={`/admin/view-grocery`}
              component={ViewGrocery}
            />
            <PrivateRoute
              path={`/admin/edit-grocery/:id`}
              component={EditGrocery}
            />

            <PrivateRoute path={`/admin/payment`} component={Payment_landing} />
            <PrivateRoute
              path={`/admin/accountpayment`}
              component={AddPayAcc}
            />
            <PrivateRoute path={`/admin/upipayment`} component={AddUPI} />

            <PrivateRoute path={`/admin/view-accpay`} component={ViewPayAcc} />
            <PrivateRoute path={`/admin/view-upipay`} component={ViewUPI} />
            <PrivateRoute
              path={`/admin/editAccPay/:id`}
              component={EditPayAcc}
            />
            <PrivateRoute path={`/admin/editUpiPay/:id`} component={EditUPI} />
            <PrivateRoute path={`/admin/whatsgroup`} component={AddWhatGroup} />
            <PrivateRoute
              path={`/admin/view-whatgroup`}
              component={ViewWhatGroup}
            />
            <PrivateRoute
              path={`/admin/editWhatGroup/:id`}
              component={EditWhatGroup}
            />

            <PrivateRoute path={`/admin/setting`} component={SettingLanding} />
            <PrivateRoute
              path={`/admin/defaultGrocery`}
              component={DefaultGrocery}
            />
            <PrivateRoute
              path={`/admin/editdefaultGrocery/:id`}
              component={EditdefaultGrocery}
            />

            <PrivateRoute path={`/addCity`} component={AddCity} />
            <PrivateRoute path={`/cities`} component={Cities} />
            <PrivateRoute path={`/editCity/:id`} component={EditCity} />

            <PrivateRoute path={`/addArea`} component={AddArea} />

            <Route exact path="/dashboardguest" component={DashboardGuest} />
            <Route path="/admin/myreport" component={ReportsLanding} />
            <Route
              path="/admin/investment/viewAllinvestment"
              component={ViewAllInvestment}
            />
            <Route
              path="/admin/expenses/viewAllexpenses"
              component={ViewAllExpenses}
            />
            <Route path="/admin/view-expense" component={ViewExpenses} />
            <Route path="/admin/viewinvestment" component={ViewInvestment} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/" component={DashboardGuest} />
            <Route path="/admin/ration/allRation" component={ViewAllRation} />

            <Route path="/admin/allPayment" component={PaymentLanding} />

            <Route path="/forgetPassword" component={ForgotPassword} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/kitrequest" component={KitReq} />
            <Route path="/contactus" component={ContactUs} />


            <Route render={NotFound} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
