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
import Register from './components/UI/Register';
import Login from './components/UI/Login';


import Dashboard from './components/UI/Dashboard';
import landing from './components/UI/landing';
import Profile from './components/UI/Profile';
import AddProject from './components/Project/addProject';
import AddInvestment from './components/Investment/addInvestment';
import AddExpense from './components/Expense/addExpense';
import AddCustomerPay from './components/Customer Payment/addCustomerPayment';
import ViewProject from './components/Project/viewProject';
import EditProject from './components/Project/editProject';
import ViewInvestment from './components/Investment/viewInvestment';
import EditInvestment from './components/Investment/editInvestment';
import ViewExpenses from './components/Expense/viewExpenses';
import EditExpense from './components/Expense/editExpenses';
import ViewCustomerPay from './components/Customer Payment/viewCustomerPay';
import EditCustomerPay from './components/Customer Payment/editCustomerPay';
//---REPORTS---------------
import ReportsLanding from './components/Reports/reportsLanding';
import ViewAllProjects from './components/Reports/viewAllProjects';
import ViewAllCustomerPay from './components/Reports/viewAllCustomerPay';
import ViewAllInvestment from './components/Reports/viewAllInvestment';
import ViewAllExpenses from './components/Reports/viewAllExpenses';
import AddEstimate from './components/Estimate/addEstimate';
import ViewEstimate from './components/Estimate/viewEstimate';
import ProjectInvestmentLanding from './components/Reports/ProjectWiseReport/projectInvestmentLanding';
import NotFound from './components/UI/notFound';


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
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute path="/admin/your_profile" component={Profile} />
            <PrivateRoute path="/admin/addproject" component={AddProject} />
            <PrivateRoute path="/admin/viewproject" component={ViewProject} />
            <PrivateRoute path={`/project/editProject/:id`} component={EditProject} />
            <PrivateRoute path="/admin/addinvestment" component={AddInvestment} />
            <PrivateRoute path="/admin/viewinvestment" component={ViewInvestment} />
            <PrivateRoute path={`/admin/editInvestment/:id`} component={EditInvestment} />


            <PrivateRoute path="/admin/addexpenses" component={AddExpense} />
            <PrivateRoute path="/admin/view-expense" component={ViewExpenses} />
            <PrivateRoute path={`/admin/editExpense/:id`} component={EditExpense} />

            <PrivateRoute path="/admin/addcustomerPayment" component={AddCustomerPay} />
            <PrivateRoute path="/admin/view-customerPay" component={ViewCustomerPay} />
            <PrivateRoute path={`/admin/editCustomerPay/:id`} component={EditCustomerPay} />

            <PrivateRoute path="/admin/addestimate" component={AddEstimate} />
            <PrivateRoute path="/admin/view-estimate" component={ViewEstimate} />

            <PrivateRoute path="/admin/myreport" component={ReportsLanding} />
            <PrivateRoute path="/admin/project/viewAllproject" component={ViewAllProjects} />
            <PrivateRoute path="/admin/customerPayment/viewAllcustomerPayment" component={ViewAllCustomerPay} />
            <PrivateRoute path="/admin/investment/viewAllinvestment" component={ViewAllInvestment} />
            <PrivateRoute path="/admin/expenses/viewAllexpenses" component={ViewAllExpenses} />
            <PrivateRoute path="/admin/investment/viewAllinvestment" component={ViewAllInvestment} />
            <PrivateRoute path={`/admin/investment/projectwiseinvestment/:id`} component={ProjectInvestmentLanding} />



            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={landing} />
            <Route exact path="/register" component={Register} />
            <Route render={NotFound} />


          </Switch>
        </Fragment>
      </Router>
    </Provider >

  );
}

export default App;
