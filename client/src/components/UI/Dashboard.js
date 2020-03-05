import React, { Fragment, useEffect } from 'react'
import './Dashboard.css';

import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import { connect } from 'react-redux';
import './Dashboard.css'
import { loadUser } from '../../_actions/authAction'
import { getOverAllSumInv } from '../../_actions/investmentAction'
import { getOverAllSumExp } from '../../_actions/expenseAction'
import { getOverAllSumCustPay } from '../../_actions/customerPayAction'


import { logout } from '../../_actions/authAction';

const Dashboard = ({
    loading,
    overAllInvestment,
    overAllExpenses,
    overAllCustPay,
    auth: { firstName, lastName, username },
    loadUser, logout, getOverAllSumInv, getOverAllSumExp, getOverAllSumCustPay
}) => {

    useEffect(() => {
        loadUser()
        getOverAllSumInv()
        getOverAllSumCustPay()
        getOverAllSumExp()

    }, [loadUser, getOverAllSumInv, getOverAllSumCustPay, getOverAllSumExp]);

    const me = <Link to="/myprofile">{!username ? "" : username}</Link>;

    const totalInvest = overAllInvestment.map(p => (
        p.totalInvest
    ))

    const totalCustPay = overAllCustPay.map(p => (
        p.totalCustPay
    ))

    const totalExpense = overAllExpenses.map(p => (
        p.totalExpense
    ))

    // console.log(totalInvest)
    // console.log(totalCustPay)
    // console.log(totalExpense)
    const balence = (totalInvest[0] + totalCustPay[0])
    //console.log(balence)
    const balanceRemaining = (Math.round((balence - totalExpense) * 100) / 100)
    return (
        <Fragment>

            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <div className="ml-4 row ">
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <h1 className={`display-4`}>Dashboard </h1>

                                <p className="lead">
                                    Welcome {me},{firstName} {""} {lastName}
                                </p>
                                <p>
                                    <i className="fa fa-calendar text-secondary"></i>{" "}
                                    <Moment format="DD/MM/YYYY, h:mm:ss a">{moment().format()}</Moment>
                                </p> <br /></div>

                            <div className="col-sm-12 col-md-8 col-lg-8">
                                <div className="row">
                                    <div className="col-lg-2 col-md-3 col-sm-6">
                                        <div className="circle-tile ">
                                            <a href="#"><div className="circle-tile-heading green"><i className="fa fa-money fa-fw fa-2x"></i></div></a>
                                            <div className="circle-tile-content green">
                                                <div className="circle-tile-description text-faded"> Total Investment</div>
                                                <div className="circle-tile-number text-faded ">{totalInvest}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-sm-6">
                                        <div className="circle-tile ">
                                            <a href="#"><div className="circle-tile-heading cyan"><i className="fa fa-cart-arrow-down fa-fw fa-2x"></i></div></a>
                                            <div className="circle-tile-content cyan">
                                                <div className="circle-tile-description text-faded">Total Expense</div>
                                                <div className="circle-tile-number text-faded ">{totalExpense}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-sm-6">
                                        <div className="circle-tile ">
                                            <a href="#"><div className="circle-tile-heading orange"><i className="fa fa-credit-card-alt fa-fw fa-2x"></i></div></a>
                                            <div className="circle-tile-content orange">
                                                <div className="circle-tile-description text-faded">Customer Payment</div>
                                                <div className="circle-tile-number text-faded ">{totalCustPay}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-sm-6">
                                        <div className="circle-tile ">
                                            <a href="#"><div className="circle-tile-heading red"><i className="fa fa-usd fa-fw fa-2x"></i></div></a>
                                            <div className="circle-tile-content red">
                                                <div className="circle-tile-description text-faded">Balence</div>
                                                <div className="circle-tile-number text-faded ">{balanceRemaining}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="container">
                                <div className="row mb-1  animated fadeIn">
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/addproject" style={{ textDecoration: "none" }}>
                                            <div className="card bg-primary text-white h-100">
                                                <div className="card-body bg-primary">
                                                    <div className="rotate">
                                                        <i className="fa fa-file-code-o fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Add Project</h2>
                                                    <small>Add New Project</small>

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/addinvestment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-success h-100">
                                                <div className="card-body bg-success">
                                                    <div className="rotate">
                                                        <i className="fa fa-money fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Investment</h2>
                                                    <small>investment on Project</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/addexpenses" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-info h-100">
                                                <div className="card-body bg-info">
                                                    <div className="rotate">
                                                        <i className="fa fa-shopping-cart fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Add Expenses</h2>
                                                    <small>Expenses on Project</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/addcustomerPayment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-warning h-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-credit-card fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Add Customer Payment</h2>
                                                    <small>Customer Payment Details</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div> <br />

                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/addestimate" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-grey h-100">
                                                <div className="card-body bg-light">
                                                    <div className="rotate">
                                                        <i className="fa fa-credit-card fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Add Estimated Amount</h2>
                                                    <small text-dark>Estimate on New Project</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div> <br />
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/myreport" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-dark h-100">
                                                <div className="card-body bg-dark">
                                                    <div className="rotate">
                                                        <i className="fa fa-bar-chart fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase text-white">Reports</h2>
                                                    <small>View All Reports</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link onClick={logout} to="/login" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-danger h-100">
                                                <div className="card-body bg-danger">
                                                    <div className="rotate">
                                                        <i className="fa fa-unlock fa-4x"></i>
                                                    </div>
                                                    <h2 className="text-uppercase">Logout</h2>
                                                    <small>Logout from your Account</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                )}

        </Fragment>
    );
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,

    loadUser: PropTypes.func.isRequired,
    getOverAllSumInv: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getOverAllSumExp: PropTypes.func.isRequired,
    getOverAllSumCustPay: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    overAllCustPay: state.customerpay.overAllCustPay,
    overAllInvestment: state.investment.overAllInvestment,
    overAllExpenses: state.expense.overAllExpenses,

});
export default connect(mapStateToProps, { loadUser, logout, getOverAllSumInv, getOverAllSumExp, getOverAllSumCustPay })(withRouter(Dashboard));


// <div className="row">
//                                     <button type="submit" className="py-3 px-5 bg-success text-white font-weight-bold mt-3">Inv- ${totalInvest}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3">Exp- $  {totalExpense}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-warning text-white border-0 rounded font-weight-bold mt-3">CustPay- $  {totalCustPay}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-dark text-white border-0 rounded font-weight-bold mt-3">Rem- $  {balanceRemaining}</button>

//                                 </div>