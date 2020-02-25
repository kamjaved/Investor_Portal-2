import React, { Fragment, useState } from 'react'
import { connect } from "react-redux";
import './Dashboard.css';
import PropTypes from 'prop-types';
import { updateMyPassword, updateMe } from "../../_actions/authAction"

const Profile = ({
    auth: { companyName, regisNo, logoURL, isAuthenticated, user, loading, role },
    logout,
    history,
    updateMyPassword,
    updateMe

}) => {

    const [formData, setFormData] = useState({
        passwordCurrent: "",
        password: "",
        passwordConfirm: ""
    });

    const [photoData, setPhotoData] = useState({
        companyName: companyName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        logoURL: logoURL,
        regisNo: regisNo,
    });

    const onChangePhotoHandler = e => {
        e.preventDefault();
        setPhotoData({ ...photoData, [e.target.name]: e.target.value });
    };

    const onsubmitPhoto = e => {
        e.preventDefault();
        updateMe(photoData);
    };

    const [statedisable, setstateDisable] = useState({
        disabled: true
    })

    const { passwordCurrent, password, passwordConfirm } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        updateMyPassword(formData, history);
    };

    const handleDisable = () => {
        setstateDisable({
            disabled: !statedisable.disabled
        })
    }
    return (
        <Fragment>
            <section className="user-profile section animated fadeInUp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-lg-3 offset-lg-0">
                            <div className="sidebar">
                                <div className="widget user shadow p-3 mb-5 bg-white rounded">
                                    <div className="image d-flex justify-content-center">
                                        <img src={logoURL} width="250"
                                            height="100" alt="" className="" />
                                    </div>
                                    <h5 className="text-center">{companyName}</h5>
                                    <h5 className="text-center"><i className="fa fa-dot-circle-o text-info "> {role}</i></h5>

                                </div>

                            </div>
                        </div>
                        <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0">
                            <div className="widget welcome-message">
                                <h2>View profile <i className="fa fa-pencil-square fa-lg ml-4" data-toggle="tooltip" title="Edit Details" onClick={handleDisable} ></i></h2>
                                <p>GlobusLabs has a team of highly trained engineers, and executives from different verticals who keep researching on new technology to come up with more cutting edge solutions and products for our customers. We believe in providing cutting edge solutions using latest technology.</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="widget personal-info">
                                        <h3 className="widget-header user">View Personal Information </h3>
                                        <form onSubmit={onsubmitPhoto} >
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input
                                                    type="text" className="form-control" name="companyName"
                                                    placeholder={companyName}
                                                    value={statedisable.disabled ? companyName : photoData.companyName}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email"
                                                    placeholder={user.email}
                                                    value={statedisable.disabled ? user.email : photoData.email}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>

                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" name="address"
                                                    placeholder={user.address}
                                                    value={statedisable.disabled ? user.address : photoData.address}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>

                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" className="form-control" name="city"
                                                    placeholder={user.city}
                                                    value={statedisable.disabled ? user.city : photoData.city}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="widget change-email mb-0">
                                        <h3 className="widget-header user">View Registrion Detail</h3>
                                        <form onSubmit={onsubmitPhoto} >
                                            <div className="form-group">
                                                <label>Phone No.</label>
                                                <input type="text" className="form-control" name="phone"
                                                    placeholder={user.phone}
                                                    value={statedisable.disabled ? user.phone : photoData.phone}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Registration No.</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="regisNo"
                                                    placeholder={regisNo}
                                                    value={statedisable.disabled ? regisNo : photoData.regisNo}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Comapny Logo URL</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={logoURL} name="logoURL"
                                                    value={statedisable.disabled ? logoURL : photoData.logoURL}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <button type="submit" className="btn btn-transparent">Submit Details</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="widget change-password">
                                        <h3 className="widget-header user">Edit Password</h3>
                                        <form onSubmit={e => onSubmitHandler(e)}>
                                            <div className="form-group">
                                                <label>Current Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={passwordCurrent}
                                                    name="passwordCurrent"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={password}
                                                    name="password"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm New Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={passwordConfirm}
                                                    name="passwordConfirm"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <button className="btn btn-transparent">Change Password</button>
                                        </form>
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


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    updateMyPassword: PropTypes.func.isRequired,
    updateMe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateMyPassword, updateMe })(
    Profile
);

