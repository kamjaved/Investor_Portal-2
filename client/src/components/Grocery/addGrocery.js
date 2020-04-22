import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addGrocery } from '../../_actions/groceryAction'
import '../UI/Dashboard.css'

const AddCustomerPay = ({

    history,
    addGrocery,


}) => {

    const [formData, setFormData] = useState({
        groceryKitName: "",
        price: "",
        items: "",


    });

    const { groceryKitName, items, price } = formData;


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const onSubmitHandler = e => {
        e.preventDefault();
        addGrocery(formData, history);
        console.log(formData)

    };



    return (
        <Fragment>
            <div className="container-fluid">
                <form onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-danger">
                                        <div>
                                            <h3 className="bg-danger text-center p-4 text-white"><Link to="/admin/setting" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Add Grocery Kit</h3></div>
                                        <fieldset className="p-4">

                                            <input name="groceryKitName"
                                                placeholder="Name of Grocery Kit"
                                                type="text"
                                                value={groceryKitName}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            <input name="price"
                                                placeholder="Total Price"
                                                type="text"
                                                value={price}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />


                                            <input name="items"
                                                placeholder="Grocery Items "
                                                type="text"
                                                value={items}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />
                                            <small className="text-muted">
                                                Enter comma separated values. Eg: Rice-10kg Flour-10Kg,etc.
                                         
                                              </small>

                                            <button type="submit" className="d-block py-3 px-5 bg-danger border-0 rounded font-weight-bold mt-3 text-white">Add</button>

                                        </fieldset>

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

AddCustomerPay.propTypes = {

    addGrocery: PropTypes.func.isRequired,


}

export default connect(null, { addGrocery })(AddCustomerPay);
