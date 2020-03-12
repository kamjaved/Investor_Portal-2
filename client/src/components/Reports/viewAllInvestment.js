import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllInvestments
} from "../../_actions/investmentAction";
import { getAllUsers } from '../../_actions/authAction'

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllInvestment = ({
    getAllInvestments,
    allinvestments,
    getAllUsers,
    users,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllInvestments();
        getAllUsers();
        //eslint-disable-next-line
    }, [getAllInvestments, getAllUsers]);


    let userOption = users.map(user => (
        <Link className="dropdown-item" to={`/admin/investment/userInvestment/${user._id}`} key={user._id} > {user.username}</Link>

    ))





    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Investments </h2>

                                <div className="dropdown show">

                                    <Link className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select User
                                </Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        {userOption}
                                    </div>
                                </div>

                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Recipt</th>
                                                <th scope="col">Username</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allinvestments.map(investment => (
                                                <tr key={investment._id}>
                                                    <td>{investment.project.projectName}</td>
                                                    <td>{`${investment.amount} ${investment.currency}`}</td>
                                                    <td>${`${investment.convAmt}`}</td>
                                                    <td>{`${investment.date}`}</td>
                                                    <td><img src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`} alt={investment.image} className="profileImg"></img></td>
                                                    <td>{`${investment.user.username}`}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ViewAllInvestment.propTypes = {
    getAllInvestments: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    allinvestments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    filtered: state.investment.filtered,
    loading: state.investment.loading,
    users: state.auth.users,
    allinvestments: state.investment.allinvestments
});
export default connect(
    mapStateToProps,
    { getAllInvestments, getAllUsers }
)(ViewAllInvestment);
