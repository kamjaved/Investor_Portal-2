import React, { Fragment, useEffect } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from './utils/PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";

import './App.css';
import Alert from "./components/UI/Alert";
import Navbar from './components/UI/navbar';
import Login from './components/UI/Login';
//import Register from './components/UI/Register';


import Dashboard from './components/UI/Dashboard';
import Profile from './components/UI/Profile';
import AddInvestment from './components/Investment/addInvestment';
import AddExpense from './components/Expense/addExpense';
import ViewInvestment from './components/Investment/viewInvestment';
import EditInvestment from './components/Investment/editInvestment';
import ViewExpenses from './components/Expense/viewExpenses';
import EditExpense from './components/Expense/editExpenses';
//---REPORTS---------------
import ReportsLanding from './components/Reports/reportsLanding';
import ViewAllInvestment from './components/Reports/viewAllInvestment';
import ViewAllExpenses from './components/Reports/viewAllExpenses';
import NotFound from './components/UI/notFound';
import UserInvestment from './components/Reports/userBasedReport/usersInvestment';
import UserExpense from './components/Reports/userBasedReport/usersExpenses';
import MonthInvestment from './components/Reports/monthbasedReport/monthInvestment';
import MonthExpense from './components/Reports/monthbasedReport/monthExpense';
import UserMonthInv from './components/Reports/monthbasedReport/usermonthInv';
import UsermonthExp from './components/Reports/monthbasedReport/usermonthExp';
import EditProfile from './components/UI/editProfile';
import ForgotPassword from './components/UI/forgotPassword';
import ResetPassword from './components/UI/ResetPassword';
import DashboardGuest from './components/UI/Dashboardguest';
import AddRation from './components/Ration/addRation';
import ViewRation from './components/Ration/viewRation';
import EditRation from './components/Ration/editRation';
import ViewAllRation from './components/Reports/viewAllRation';




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

            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin/your_profile" component={Profile} />
            <PrivateRoute path="/admin/editmyprofile" component={EditProfile} />
            <PrivateRoute path="/admin/addinvestment" component={AddInvestment} />
            <PrivateRoute path={`/admin/editInvestment/:id`} component={EditInvestment} />
            <PrivateRoute path="/admin/addexpenses" component={AddExpense} />
            <PrivateRoute path={`/admin/editExpense/:id`} component={EditExpense} />
            <PrivateRoute path={`/admin/investment/userInvestment/:id`} component={UserInvestment} />
            <PrivateRoute path={`/admin/expense/userExpense/:id`} component={UserExpense} />
            <PrivateRoute path={`/admin/investment/monthInvestment/:year`} component={MonthInvestment} />
            <PrivateRoute path={`/admin/expenses/monthInvestment/:year`} component={MonthExpense} />
            <PrivateRoute path={`/admin/investment/usermonthInvestment/:year/:id`} component={UserMonthInv} />
            <PrivateRoute path={`/admin/expenses/usermonthExpense/:year/:id`} component={UsermonthExp} />

            <PrivateRoute path={`/admin/add-ration`} component={AddRation} />
            <PrivateRoute path={`/admin/view-ration`} component={ViewRation} />
            <PrivateRoute path={`/admin/editRation/:id`} component={EditRation} />


            <Route exact path="/dashboardguest" component={DashboardGuest} />
            <Route path="/admin/myreport" component={ReportsLanding} />
            <Route path="/admin/investment/viewAllinvestment" component={ViewAllInvestment} />
            <Route path="/admin/expenses/viewAllexpenses" component={ViewAllExpenses} />
            <Route path="/admin/view-expense" component={ViewExpenses} />
            <Route path="/admin/viewinvestment" component={ViewInvestment} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/" component={DashboardGuest} />
            <Route path="/admin/ration/allRation" component={ViewAllRation} />


            <Route path="/forgetPassword" component={ForgotPassword} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route render={NotFound} />


          </Switch>
        </Fragment>
      </Router>
    </Provider >

  );
}

export default App;

