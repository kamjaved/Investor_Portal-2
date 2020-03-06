import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addCustomerPay } from '../../_actions/customerPayAction'
import { getProjects } from '../../_actions/projectAction'
import { getCurrencies } from '../../_actions/investmentAction'
import '../UI/Dashboard.css'

const AddCustomerPay = ({
    getCurrencies,
    history,
    getProjects,
    addCustomerPay,
    projects,
    currencies

}) => {


    const [formData, setFormData] = useState({
        project: "",
        customer: "",
        amount: "",
        currency: "",
        convAmt: "",
        date: "",
        invoiceNo: ""

    });

    const { project, customer, amount, date, invoiceNo, currency } = formData;

    useEffect(() => {
        getProjects();

        //eslint-disable-next-line
    }, [getProjects]);

    useEffect(() => {
        getCurrencies();
        //console.log(currencies[currency]);
        //eslint-disable-next-line
    }, [getCurrencies, currency]);


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, convAmt: result });
        //console.log(formData)

    };

    const onSubmitHandler = e => {
        e.preventDefault();
        addCustomerPay(formData, history);
        console.log(formData)

    };

    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })


    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));
    let customerOptn = projects.map(customer => (
        <option key={customer._id} value={customer.customerName}>
            {customer.customerName}
        </option>
    ));
    return (
        <Fragment>
            <div className="container-fluid">
                <form onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeInRight">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">
                                        <h3 className="bg-warning text-center p-4">New Customer Payment</h3>
                                        <fieldset className="p-4">

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="customer"
                                                value={customer}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Customer </option>
                                                {customerOptn}
                                            </select>

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>

                                            <input name="invoiceNo"
                                                placeholder="Invoice No."
                                                type="text"
                                                value={invoiceNo}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />


                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency">
                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="OMR" className="form-control">OMR-Omani Riyal</option><br />
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>

                                            </select><br />
                                            <p className="ml-4"> <b>1 USD= </b>{currencies[currency]} {currency}</p>


                                            <input name="amount"
                                                placeholder="Amount"
                                                type="text"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" required />


                                            <input name="convAmt"
                                                placeholder="In Euro Pound"
                                                type="number"
                                                value={result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />

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
    getProjects: PropTypes.func.isRequired,
    addCustomerPay: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    currencies: state.investment.currencies


});
export default connect(mapStateToProps, { addCustomerPay, getProjects, getCurrencies })(AddCustomerPay);
