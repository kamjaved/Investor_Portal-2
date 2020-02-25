import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addExpense } from '../../_actions/expenseAction'
import { getCurrencies } from '../../_actions/investmentAction'
import { getProjects } from '../../_actions/projectAction'
import { getAllUsers } from "../../_actions/authAction"
import '../UI/Dashboard.css'

const AddExpense = ({
    history,
    getAllUsers,
    getProjects,
    getCurrencies,
    addExpense,
    projects,
    currencies,
    users,
}) => {

    const [formData, setFormData] = useState({
        project: "",
        amount: "",
        currency: "",
        date: '',
        image: "",
        purpose: "",
        convAmt: "",

    });

    const { project, amount, currency, date, image, purpose } = formData;


    useEffect(() => {
        getProjects();
        getAllUsers();
        //eslint-disable-next-line
    }, [getProjects, getAllUsers]);


    useEffect(() => {
        getCurrencies();
        //console.log(currencies[currency]);
        //eslint-disable-next-line
    }, [getCurrencies, currency]);


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        //console.log(formData)

    };

    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ image: e.target.files[0] });
    };


    //console.log(currencies[currency])
    const result = (amount / currencies[currency]).toFixed(4)

    // console.log({ result })

    const onSubmitHandler = e => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("image", image);
        formData.append("project", project);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("date", date);
        formData.append("purpose", purpose);
        formData.append("convAmt", result);



        addExpense(formData, history);
        console.log(formData)

    };

    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));

    // let usersOptn = users.map(users => (
    //     <option key={users._id} value={users._id}>
    //         {users.firstName + " " + users.lastName}
    //     </option>
    // ));
    return (
        <Fragment>
            <div className="container-fluid">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeInRight">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-info">
                                        <h3 className="bg-info text-center text-white p-4">New Expense</h3>
                                        <fieldset className="p-4">

                                            <div>
                                                <small>Upload Recipt <b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                                <input
                                                    placeholder="Upload Receipt"
                                                    type="file"
                                                    tdata-button="Upload Recipt"
                                                    onChange={onChangeImage} className="border p-3 w-100 my-2" /></div>

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>


                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency"
                                                value={currency}>

                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="USD">USD-US DOLLAR</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>
                                                <option value="OMR">OMR-Omani Riyal</option>
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="QAR">QAR-QATARI Riyal</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>

                                            </select> <br />
                                            <p> <b>1 USD= </b>{currencies[currency]} {currency}</p>

                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" required />

                                            <input name="convAmt"
                                                placeholder="In Euro Pound"
                                                type="number"
                                                value={result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" disabled />

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
    getProjects: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    addExpense: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    users: state.auth.users,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { addExpense, getProjects, getAllUsers, getCurrencies })(AddExpense);
