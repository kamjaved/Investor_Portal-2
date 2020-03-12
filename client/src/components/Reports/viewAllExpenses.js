import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllExpenses } from "../../_actions/expenseAction";
import { getAllUsers } from '../../_actions/authAction'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllExpenses = ({
    getAllExpenses,
    allexpenses,
    getAllUsers,
    users,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllExpenses();
        getAllUsers();
        //eslint-disable-next-line
    }, [getAllExpenses, getAllUsers,]);


    let userOption = users.map(user => (
        <Link className="dropdown-item" to={`/admin/expense/userExpense/${user._id}`} key={user._id} > {user.username}</Link>

    ))

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-12 col-md-10 align-item-center">
                                <h2 className="text-center pt-2">View All Expenses </h2>

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
                                                    <td><img src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`} alt={expense.image} className="profileImg"></img></td>
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
    getAllUsers: PropTypes.func.isRequired,
    expenses: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,

};

const mapStateToProps = state => ({
    allexpenses: state.expense.allexpenses,
    filtered: state.expense.filtered,
    loading: state.expense.loading,
    users: state.auth.users
});
export default connect(
    mapStateToProps,
    { getAllExpenses, getAllUsers }
)(ViewAllExpenses);
