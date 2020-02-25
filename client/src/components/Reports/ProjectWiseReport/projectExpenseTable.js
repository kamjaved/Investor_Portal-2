import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getProjectExpenses,
} from "../../../_actions/expenseAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectWiseExpense = ({
    getProjectExpenses,
    projectwiseExpense,
    filtered,
    loading,
    history,
    projectId
}) => {
    useEffect(() => {
        getProjectExpenses(projectId);
        //eslint-disable-next-line
    }, [getProjectExpenses]);

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-2 animated fadeInRight">

                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Amount($)</th>
                                <th scope="col">Date</th>
                                <th scope="col">Recipt</th>

                            </tr>
                        </thead>

                        <tbody>
                            {projectwiseExpense.map(expense => (
                                <tr key={expense._id}>
                                    <td>{`${expense.user.username}`}</td>
                                    <td>{`${expense.amount} ${expense.currency}`}</td>
                                    <td>${`${expense.convAmt}`}</td>
                                    <td>{`${expense.date}`}</td>
                                    <td><img src={expense.image} alt="rcp_img" className="profileImg"></img></td>


                                </tr>

                            ))}
                        </tbody>
                    </table>

                </section>
            </div>
        </Fragment>
    );
};

ProjectWiseExpense.propTypes = {
    getProjectExpenses: PropTypes.func.isRequired,
    projectwiseExpense: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseExpense: state.expense.projectwiseExpense,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectExpenses, }
)(ProjectWiseExpense);
