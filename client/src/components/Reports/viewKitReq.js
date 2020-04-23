import React, { Fragment, useEffect } from 'react'
import {
    getKitReqs,
} from "../../_actions/kitReqAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";


const KitReq = ({
    getKitReqs,
    kitreqs,

}) => {

    useEffect(() => {
        getKitReqs();
        //eslint-disable-next-line
    }, [getKitReqs]);



    return (
        <Fragment>
            <div className="container mb-4 pb-4">
                <div class="row">
                    {kitreqs.map(cu => (
                        <div class="col-sm-4 mb-2">
                            <div class="card border border-warning">
                                <div class="card-body">
                                    <h5 class="card-title"><strong>{cu.name}</strong></h5>
                                    <p class="card-text"> <i className="fa fa-envelope"></i> Email- {cu.email}</p> <hr />
                                    <p class="card-text"> <i className="fa fa-phone"></i> Phone- {cu.phone}</p><hr />

                                    <h3 className="text-danger"> <i className="fa fa-medkit text-danger"></i> Kit Required-{cu.kitQuantity}</h3><hr />

                                    <p class="card-text"> <i className="fa fa-map-marker"></i> Address-  </p>

                                    <em> <strong>House No-</strong>{cu.houseNo},  <strong>Landmark-</strong>{!cu.landmark ? "" : cu.landmark} <br />
                                        <strong>Road No-</strong>{cu.road}, <strong>Area-</strong>{cu.area}<br />
                                        <strong>City-</strong>{cu.city}, <strong>State-</strong>{cu.stateName} <br />
                                    </em>

                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

        </Fragment>
    )
}


KitReq.propTypes = {
    getKitReqs: PropTypes.func.isRequired,
    kitreqs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    kitreqs: state.kitreq.kitreqs,

});
export default connect(
    mapStateToProps,
    { getKitReqs, }
)(KitReq);

