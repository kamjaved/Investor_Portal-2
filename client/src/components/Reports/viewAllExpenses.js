import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllExpenses } from "../../_actions/expenseAction";
import { getAllUsers } from '../../_actions/authAction'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from 'moment'
import ReactToExcel from "react-html-table-to-excel";

const ViewAllExpenses = ({
    getAllExpenses,
    allexpenses,
    getAllUsers,
    users,

}) => {


    const [formData, setFormData] = useState({
        year: 0,
        id: "",
    });

    useEffect(() => {
        getAllExpenses();
        getAllUsers();
        //eslint-disable-next-line
    }, [getAllExpenses, getAllUsers,]);



    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <h2 className="text-center pt-2">View All Expenses </h2>

                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-12 col-md-10 align-item-center">

                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2" id="table-exp">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Expensed by</th>
                                                <th scope="col">Purpose</th>
                                                <th scope="col">Recipt</th>
                                                <th scope="col">Added By</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allexpenses.map(expense => (
                                                <tr key={expense._id}>

                                                    <td>₹{`${expense.amount}`}</td>
                                                    <td>{moment(expense.date).format("DD-MM-YYYY")}</td>
                                                    <td>{!expense.expensor ? "NA" : expense.expensor}</td>
                                                    <td>{`${expense.purpose}`}</td>
                                                    <td><img src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`} alt={expense.image} className="profileImg"></img></td>
                                                    <td>{`${expense.user.username}`}</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <ReactToExcel
                                        className=" btn btn-danger "
                                        table="table-exp" // id of table which you want to export
                                        filename={`exp-${Date.now()}`} // name of the file 
                                        sheet="sheet"
                                        buttonText="Export Table" // button name 
                                    />
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
