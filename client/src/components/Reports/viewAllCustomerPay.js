import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllCustomerPays,
} from "../../_actions/customerPayAction.js";
import { getCustomers } from '../../_actions/customerAction'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllCustomerPay = ({
    getAllCustomerPays,
    allcustomerPay,
    filtered,
    getCustomers,
    customers,
    loading,
    history
}) => {
    useEffect(() => {
        getAllCustomerPays();
        getCustomers();
        //eslint-disable-next-line
    }, [getAllCustomerPays, getCustomers]);



    let customerOption = customers.map(cust => (
        <Link className="dropdown-item" to={`/admin/customerPayment/customersPayment/${cust._id}`} key={cust._id} > {cust.name}</Link>

    ))

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Customer Payment </h2>

                                <div className="dropdown show">

                                    <Link className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select Customer
                            </Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        {customerOption}
                                    </div>
                                </div>

                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
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
                                                    <td>{customerPay.customer.name}</td>
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
    allcustomerPay: PropTypes.array.isRequired,
    getCustomers: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    allcustomerPay: state.customerpay.allcustomerPay,
    filtered: state.customerpay.filtered,
    loading: state.customerpay.loading,
    customers: state.customer.customers,

});
export default connect(
    mapStateToProps,
    { getAllCustomerPays, getCustomers }
)(ViewAllCustomerPay);
