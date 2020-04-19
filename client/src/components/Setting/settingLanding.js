import React, { Fragment, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom';
import Spinner from "../UI/Spinner";
import { connect } from 'react-redux';
import '../Reports/reports.css'

const SettingLanding = ({
    loading,


}) => {



    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <div>
                            <div className="container mb-4 pb-4">
                                <div className="row mb-1  animated fadeIn">

                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/defaultGrocery" style={{ textDecoration: "none" }}>
                                            <div className="card text-white gray h-100">
                                                <div className="card-body gray">
                                                    <div className="rotate">
                                                        <i className="fa fa-cutlery fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase text-white">Set Default Grocery</h3>
                                                    <small>Set Default Grocery Pack</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>

                )}

        </Fragment>
    );
}
SettingLanding.propTypes = {
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,

});
export default connect(mapStateToProps, null)(withRouter(SettingLanding));


// <div className="col-xl-3 col-sm-6 py-2">
// <Link to="/admin/investment/projectwiseinvestment" style={{ textDecoration: "none" }}>
//     <div className="card text-white bg-success h-100">
//         <div className="card-body bg-success">
//             <div className="rotate">
//                 <i className="fa fa-money fa-4x"></i>
//             </div>
//             <h3 className="text-uppercase">Prject Wise Investment</h3>
//             <small>View Total investment on Each Projects</small>
//         </div>
//     </div>
// </Link>
// </div>