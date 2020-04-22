import React, { Fragment, useState, useEffect } from 'react'
import { connect } from "react-redux";
import './Dashboard.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { loadUser } from '../../_actions/authAction';


const OrgProfile = ({
    user: { organisation },
    history,
}) => {

    console.log(organisation);

    return (
        <Fragment>
            <section className="user-profile section animated fadeInUp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-lg-3 offset-lg-0">
                            <div className="sidebar">
                                <div className="widget user shadow p-3 mb-5 bg-white rounded">
                                    <div className="image d-flex justify-content-center">
                                        <img src={organisation.logo} width="250"
                                            height="100" alt="" className="" />
                                    </div>
                                    <h5 className="text-center">{organisation.orgName}</h5>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0">
                            <div className="widget welcome-message">
                                <Link><h2>View profile <i className="fa fa-pencil-square fa-lg ml-4" data-toggle="tooltip" title="Edit Details"></i></h2></Link>


                                <p>GlobusLabs has a team of highly trained engineers, and executives from different verticals who keep researching on new technology to come up with more cutting edge solutions and products for our customers. We believe in providing cutting edge solutions using latest technology.</p>
                            </div>


                            <div className="row">
                                <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0 text-center">
                                    <h3 className="widget-header user">View Personal Information </h3></div>
                                <div className="col-lg-10 col-md-10">

                                    <div className="widget personal-info">
                                        <h3>Organisation Name- {organisation.orgName}</h3>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}


OrgProfile.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(
    OrgProfile
);

//encType="multipart/form-data"
