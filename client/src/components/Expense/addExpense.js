import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExpense } from '../../_actions/expenseAction'
import { getAllUsers } from "../../_actions/authAction"
import '../UI/Dashboard.css'

const AddExpense = ({
    history,
    getAllUsers,
    addExpense,

    users,
}) => {

    const [formData, setFormData] = useState({

        amount: "",
        expensor: "",
        date: new Date(),
        image: "",
        purpose: "",

    });

    const { expensor, amount, date, image, purpose } = formData;


    useEffect(() => {

        getAllUsers();
        //eslint-disable-next-line
    }, [getAllUsers]);





    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        //console.log(formData)

    };


    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ ...formData, image: e.target.files[0] });
    };



    const onSubmitHandler = e => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("image", image);
        formData.append("amount", amount);
        formData.append("date", date);
        formData.append("purpose", purpose);
        formData.append("expensor", expensor);

        addExpense(formData, history);
        console.log(formData)

    };

    return (
        <Fragment>
            <div className="container-fluid  pb-4 mb-4">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-info">
                                        <div>
                                            <h3 className="bg-info text-center text-white p-4"><Link to="/dashboard" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Add Expense</h3></div>
                                        <fieldset className="p-4">


                                            <input name="expensor"
                                                placeholder="Expensor Name"
                                                type="text"
                                                value={expensor}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />



                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" required />


                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            <input name="purpose"
                                                placeholder="Purpose"
                                                type="text"
                                                value={purpose}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" required />


                                            <div>
                                                <small>Upload Recipt <b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                                <input
                                                    placeholder="Upload Receipt"
                                                    type="file"
                                                    tdata-button="Upload Recipt"
                                                    onChange={onChangeImage} className="border p-3 w-100 my-2" /></div>

                                            <button type="submit" className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3">Add</button>

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

AddExpense.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    addExpense: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({

    users: state.auth.users,

});
export default connect(mapStateToProps, { addExpense, getAllUsers, })(AddExpense);
