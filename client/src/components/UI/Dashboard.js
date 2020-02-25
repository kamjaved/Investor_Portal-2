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
import { logout } from '../../_actions/authAction';

const Dashboard = ({
    loading,
    auth: { firstName, lastName, username },
    loadUser, logout
}) => {

    useEffect(() => {
        loadUser()
    }, [loadUser]);

    const me = <Link to="/myprofile">{!username ? "" : username}</Link>;


    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <section className="ml-4">
                            <h1 className={`display-4`}>Dashboard </h1>

                            <p className="lead">
                                Welcome {me},{firstName} {""} {lastName}
                            </p>
                            <p>
                                <i className="fa fa-calendar text-secondary"></i>{" "}
                                <Moment format="DD/MM/YYYY, h:mm:ss a">{moment().format()}</Moment>
                            </p>
                        </section>

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
    logout: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,

});
export default connect(mapStateToProps, { loadUser, logout })(withRouter(Dashboard));
