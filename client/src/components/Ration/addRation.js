import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addRation } from '../../_actions/rationAction'
import { getGrocerys } from '../../_actions/groceryAction'
import '../UI/Dashboard.css'

const AddCustomerPay = ({

    history,
    addRation,
    getGrocerys,
    grocerys,


}) => {


    const [formData, setFormData] = useState({
        rationKit: "",
        desc: "",
        date: "",
        location: "",
        grocerykit: "",


    });


    useEffect(() => {
        getGrocerys();
    }, [getGrocerys])

    const { rationKit, date, desc, location, grocerykit } = formData;


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const onSubmitHandler = e => {
        e.preventDefault();
        addRation(formData, history);
        console.log(formData)

    };

    let groceryTypeOptn = grocerys.map(groce => (
        <option key={groce._id} value={groce._id}>
            {groce.groceryKitName}
        </option>
    ));


    return (
        <Fragment>
            <div className="container-fluid">
                <form onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">
                                        <div>
                                            <h3 className="bg-warning text-center p-4"><Link to="/dashboard" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Add Delivered Kit</h3></div>
                                        <fieldset className="p-4">

                                            <input name="rationKit"
                                                placeholder="No. of Ration Kit"
                                                type="number"
                                                value={rationKit}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="grocerykit"
                                                value={grocerykit}
                                                onChange={e => onChangeHandler(e)} required >
                                                <option>Select Grocery Kit</option>
                                                {groceryTypeOptn}
                                            </select>

                                            <input name="location"
                                                placeholder=" Distribution Location"
                                                type="text"
                                                value={location}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                            <input name="desc"
                                                placeholder="Description"
                                                type="text"
                                                value={desc}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />


                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />


                                            <button type="submit" className="d-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3">Add</button>

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

    addRation: PropTypes.func.isRequired,
    getGrocerys: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    grocerys: state.grocery.grocerys,
});
export default connect(mapStateToProps, { addRation, getGrocerys })(AddCustomerPay);

//passsword