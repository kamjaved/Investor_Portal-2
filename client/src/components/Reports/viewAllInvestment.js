import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllInvestments,
} from "../../_actions/investmentAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllInvestment = ({
    getAllInvestments,
    allinvestments,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllInvestments();
        //eslint-disable-next-line
    }, [getAllInvestments]);

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeInRight">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Investments </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover mt-2">
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
                                                    <td><img src={investment.image} alt="rcp_img" className="profileImg"></img></td>
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
    allinvestments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    allinvestments: state.investment.allinvestments,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getAllInvestments, }
)(ViewAllInvestment);
