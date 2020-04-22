import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addKitReq } from '../../_actions/kitReqAction'
import '../UI/Dashboard.css'
import Spinner from "../UI/Spinner";


const AddKitReq = ({

    history,
    addKitReq,
    sendingLoader,

}) => {

    const [formData, setFormData] = useState({
        name: "",
        kitQuantity: "",
        state: "",
        city: "",
        area: "",
        road: "",
        landmark: "",
        houseNo: "",
        phone: "",
        email: "",

    });

    const { name, kitQuantity, state, city, area, road, landmark, houseNo, phone, email, } = formData;


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const onSubmitHandler = e => {
        e.preventDefault();
        addKitReq(formData, history);
        console.log(formData)

    };



    return (
        <Fragment>
            <div className="container-fluid mb-4 pb-4">
                <form onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">
                                        <div>
                                            <h3 className="bg-warning text-center p-4 "><Link to="/" className=""><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Add Kit Request</h3></div>

                                        {sendingLoader ? (
                                            <Spinner />
                                        ) : (
                                                <fieldset className="p-4">

                                                    <input name="name"
                                                        placeholder="Name or Organisation Name"
                                                        type="text"
                                                        value={name}
                                                        onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                                    <input name="email"
                                                        placeholder="Email"
                                                        type="text"
                                                        value={email}
                                                        onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />


                                                    <input
                                                        name="kitQuantity"
                                                        placeholder="No. of Ration Kit Required"
                                                        type="number"
                                                        value={kitQuantity}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                        required
                                                    />

                                                    <input
                                                        name="state"
                                                        placeholder="State"
                                                        type="text"
                                                        value={state}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                        required />

                                                    <input
                                                        name="city"
                                                        placeholder="City"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                        required
                                                    />


                                                    <input
                                                        name="area"
                                                        placeholder="Area"
                                                        type="text"
                                                        value={area}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                        required
                                                    />



                                                    <input
                                                        name="road"
                                                        placeholder="Road No"
                                                        type="text"
                                                        value={road}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                    />

                                                    <input
                                                        name="houseNo"
                                                        placeholder="HouseNo"
                                                        type="text"
                                                        value={houseNo}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                        required />

                                                    <input
                                                        name="landmark"
                                                        placeholder="landmark"
                                                        type="text"
                                                        value={landmark}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                    />
                                                    <input
                                                        name="phone"
                                                        placeholder="Phone"
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e) => onChangeHandler(e)}
                                                        className="border p-2 w-100 my-2"
                                                    />


                                                    <button type="submit" className="d-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3 ">Add</button>

                                                </fieldset>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}

AddKitReq.propTypes = {
    addKitReq: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    sendingLoader: state.kitreq.sendingLoader
});
export default connect(mapStateToProps, { addKitReq })(AddKitReq);
