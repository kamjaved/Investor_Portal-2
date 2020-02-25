import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllCustomerPays,
} from "../../_actions/customerPayAction.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllCustomerPay = ({
    getAllCustomerPays,
    allcustomerPay,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllCustomerPays();
        //eslint-disable-next-line
    }, [getAllCustomerPays]);

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Customer Payment </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Project</th>
                                                <th scope="col">Invoice </th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Username</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allcustomerPay.map(customerPay => (
                                                <tr key={customerPay._id}>
                                                    <td>{customerPay.customer}</td>
                                                    <td>{customerPay.project.projectName}</td>
                                                    <td>{customerPay.invoiceNo}</td>
                                                    <td>{`${customerPay.amount} ${customerPay.currency}`}</td>
                                                    <td>${`${customerPay.convAmt}`}</td>
                                                    <td>{`${customerPay.date}`}</td>
                                                    <td>{customerPay.user.username}</td>


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

ViewAllCustomerPay.propTypes = {
    getAllCustomerPays: PropTypes.func.isRequired,
    allcustomerPay: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    allcustomerPay: state.customerpay.allcustomerPay,
    filtered: state.customerpay.filtered,
    loading: state.customerpay.loading
});
export default connect(
    mapStateToProps,
    { getAllCustomerPays }
)(ViewAllCustomerPay);
