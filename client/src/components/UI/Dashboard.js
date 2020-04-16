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
import { getTotalRations } from '../../_actions/rationAction'

import { logout } from '../../_actions/authAction';

const Dashboard = ({
    loading,
    overAllInvestment,
    overAllExpenses,
    overAllCustPay,
    totalRation,
    auth: { firstName, lastName, user: { username, image, email, role } },
    loadUser, logout, getOverAllSumInv, getOverAllSumExp, getOverAllSumCustPay, getTotalRations
}) => {

    useEffect(() => {
        loadUser()
        getOverAllSumInv()
        getOverAllSumExp()
        getTotalRations()
    }, [loadUser, getOverAllSumInv, getOverAllSumExp, getTotalRations]);

    const me = <Link to="/myprofile">{!username ? "" : username}</Link>;

    const totalInvest = overAllInvestment.map(p => (
        p.totalInvest
    ))
    const totalRationKit = totalRation.map(p => (
        p.totalRation
    ))

    const totalExpense = overAllExpenses.map(p => (
        p.totalExpense
    ))


    const balence = ((totalInvest[0] ? totalInvest[0] : 0))
    //console.log(balence)
    const balanceRemaining = (Math.round((balence - (totalExpense ? totalExpense : 0)) * 100) / 100)
    return (
        <Fragment>

            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <div className="ml-3 row mr-4 pb-4">
                            <div className="col-lg-4 col-md-6 col-sm-6 ">
                                <div className="circle-tile">

                                    <div className="circle-tile-content">
                                        <Link to="/admin/your_profile">
                                            <div className="row">
                                                <div className="col-lg-7 mr-2 circle-tile-description">Welcome, <strong>{`${firstName} ${lastName}`}</strong>
                                                    <div className="circle-tile-number text-dark ">{email}</div>
                                                </div>

                                                <div className="col-lg-4 circle-tile-description"><strong>{username}</strong>
                                                    <div className="circle-tile-number text-dark text-uppercase">{role}</div>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-8 col-lg-8">
                                <div className="row">
                                    <div className="col-lg-3 col-md-5 col-sm-6">
                                        <div className="circle-tile ">
                                            <Link to="/admin/investment/viewAllinvestment"><div className="circle-tile-heading green"><i className="fa fa-money fa-fw fa-2x"></i></div></Link>
                                            <div className="circle-tile-content green">
                                                <div className="circle-tile-description text-faded"> Total Donation (INR)</div>
                                                <div className="circle-tile-number text-faded ">{!totalInvest[0] ? 0 : parseFloat(totalInvest).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-5 col-sm-6">
                                        <div className="circle-tile ">
                                            <Link to="/admin/expenses/viewAllexpenses"><div className="circle-tile-heading cyan"><i className="fa fa-cart-arrow-down fa-fw fa-2x"></i></div></Link>
                                            <div className="circle-tile-content cyan">
                                                <div className="circle-tile-description text-faded">Total Expense (INR)</div>
                                                <div className="circle-tile-number text-faded ">{!totalExpense[0] ? 0 : parseFloat(totalExpense).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-5 col-sm-6">
                                        <div className="circle-tile ">
                                            <Link to="/admin/ration/allRation"><div className="circle-tile-heading orange"><i className="fa fa fa-medkit fa-fw fa-2x"></i></div></Link>
                                            <div className="circle-tile-content orange">
                                                <div className="circle-tile-description text-faded">RationKit Dipsatched</div>
                                                <div className="circle-tile-number text-faded ">{!totalRationKit[0] ? 0 : totalRationKit[0]}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-5 col-sm-6">
                                        <div className="circle-tile ">
                                            <a href="#"><div className="circle-tile-heading red"><i className="fa fa-inr fa-fw fa-2x"></i></div></a>
                                            <div className="circle-tile-content red">
                                                <div className="circle-tile-description text-faded">Balance (INR)</div>
                                                <div className="circle-tile-number text-faded ">{balanceRemaining} = <small className="text-white">{`(${Math.round((balanceRemaining / 785) * 10) / 10} Kit)`}</small></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="container">
                                <div className="row mb-1  animated fadeIn">

                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link to="/admin/addinvestment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-success h-100 w-100">
                                                <div className="card-body bg-success">
                                                    <div className="rotate">
                                                        <i className="fa fa-money fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase">Add Donation</h4>
                                                    <small>Add new Donation</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link to="/admin/addexpenses" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-info h-100 w-100">
                                                <div className="card-body bg-info">
                                                    <div className="rotate">
                                                        <i className="fa fa-shopping-cart fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase">Add Expenses</h4>
                                                    <small>New Expense</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link to="/admin/add-ration" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-warning h-100 w-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-medkit fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase">Add Ration Kit</h4>
                                                    <small>Add new Ration Kit</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div> <br />



                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link to="/admin/myreport" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-dark h-100 w-100">
                                                <div className="card-body bg-dark">
                                                    <div className="rotate">
                                                        <i className="fa fa-bar-chart fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase text-white">Reports</h4>
                                                    <small>View All Reports</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link onClick={logout} to="/login" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-danger h-100 w-100">
                                                <div className="card-body bg-danger">
                                                    <div className="rotate">
                                                        <i className="fa fa-unlock fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase">Logout</h4>
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
    getTotalRations: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    overAllInvestment: state.investment.overAllInvestment,
    overAllExpenses: state.expense.overAllExpenses,
    totalRation: state.ration.totalRation,
    getTotalRations: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { loadUser, logout, getOverAllSumInv, getOverAllSumExp, getTotalRations })(withRouter(Dashboard));


// <div className="row">
//                                     <button type="submit" className="py-3 px-5 bg-success text-white font-weight-bold mt-3">Inv- ${totalInvest}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3">Exp- $  {totalExpense}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-warning text-white border-0 rounded font-weight-bold mt-3">CustPay- $  {totalCustPay}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-dark text-white border-0 rounded font-weight-bold mt-3">Rem- $  {balanceRemaining}</button>

//                                 </div>