import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getCustomers,
    deleteCustomer,
    setCurrentCustomer
} from "../../_actions/customerAction";

import './custmstyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CustomerMaster = ({
    getCustomers,
    deleteCustomer,
    setCurrentCustomer,
    customers,

}) => {
    useEffect(() => {
        getCustomers();
        //eslint-disable-next-line
    }, [getCustomers]);

    const onDeleteHandler = id => {
        deleteCustomer(id);
    };


    return (

        <Fragment>

            <Fragment>
                <div class="container">
                    <div class="row border border-dark">
                        {customers.map(cust => (
                            <div class="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center" key={cust._id}>
                                <div class="row border border-danger">
                                    <div class="col-lg-12 col-sm-12 col-12 profile-header"></div>
                                </div>
                                <div class="row user-detail">
                                    <div class="col-lg-12 col-sm-12 col-12">
                                        <img src={`${process.env.PUBLIC_URL}/uploads/profile/${cust.image}`} alt={cust.image} class="rounded-circle img-thumbnail" />
                                        <h5>{cust.name}</h5>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                                            {cust.address}</p>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                                            {cust.phone}</p>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                                            {cust.email}</p>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                                       Added By:- <strong>{cust.user.username}</strong></p>
                                        <hr />
                                        <span>Lorem ips consectetur adipisium ,eiusmod tempor incididuin reprehendeanim.</span>
                                        <hr />
                                        <Link to="#" class="btn btn-info btn-sm">Edit</Link>
                                        <Link to="#" class="btn btn-danger btn-sm">Delete</Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>

        </Fragment>

    );
};

CustomerMaster.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
    setCurrentCustomer: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    customers: state.customer.customers,
    filtered: state.customer.filtered,
    loading: state.customer.loading
});
export default connect(
    mapStateToProps,
    { getCustomers, deleteCustomer, setCurrentCustomer }
)(CustomerMaster);
