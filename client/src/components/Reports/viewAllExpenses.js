import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllExpenses,
} from "../../_actions/expenseAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllExpenses = ({
    getAllExpenses,
    allexpenses,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllExpenses();
        //eslint-disable-next-line
    }, [getAllExpenses]);


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-12 col-md-10 align-item-center">
                                <h2 className="text-center pt-2">View All Expenses </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Purpose</th>
                                                <th scope="col">Recipt</th>
                                                <th scope="col">Username</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allexpenses.map(expense => (
                                                <tr key={expense._id}>
                                                    <td>{expense.project.projectName}</td>
                                                    <td>{`${expense.amount} ${expense.currency}`}</td>
                                                    <td>${`${expense.convAmt}`}</td>
                                                    <td>{`${expense.date}`}</td>
                                                    <td>{`${expense.purpose}`}</td>
                                                    <td><img src={expense.image} alt="rcp_img" className="profileImg"></img></td>
                                                    <td>{`${expense.user.username}`}</td>


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

ViewAllExpenses.propTypes = {
    getAllExpenses: PropTypes.func.isRequired,
    expenses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    allexpenses: state.expense.allexpenses,
    filtered: state.expense.filtered,
    loading: state.expense.loading
});
export default connect(
    mapStateToProps,
    { getAllExpenses, }
)(ViewAllExpenses);
