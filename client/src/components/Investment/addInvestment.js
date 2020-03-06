import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { currencyOptn } from 'currency-flags'
import { addInvestment, getCurrencies } from '../../_actions/investmentAction'
import { getProjects } from '../../_actions/projectAction'
import { getAllUsers } from "../../_actions/authAction"
import '../UI/Dashboard.css'

const AddInvestment = ({
    history,
    getAllUsers,
    getProjects,
    getCurrencies,
    addInvestment,
    projects,
    currencies,
    users,
}) => {



    const [formData, setFormData] = useState({
        project: "",
        amount: "",
        currency: "",
        date: "",
        image: "",
        convAmt: "",

    });

    const { project, amount, currency, date, image, } = formData;

    useEffect(() => {
        getProjects();
        getAllUsers();

        //eslint-disable-next-line
    }, [getProjects, getAllUsers,]);

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
        setFormData({ ...formData, image: e.target.files[0] });
    };


    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })



    const onSubmitHandler = e => {
        e.preventDefault();

        // for uploading images send file as blob multipart/form-data
        let formData = new FormData();

        formData.append("image", image);
        formData.append("project", project);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("date", date);
        formData.append("convAmt", result);



        addInvestment(formData, history);
        //console.log(formData)

    };

    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));

    // let usersOptn = users.map(users => (
    //     <option key={users._id} value={users._id} >
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
                                    <div className="bg-light border border-success">
                                        <h3 className="bg-success text-center text-white p-4"> New Investment</h3>
                                        <fieldset className="p-4">

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                //defaultValue={{ label: "Select Project", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>


                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency"
                                                value={currency}
                                            >

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
                                            <p className="ml-4"> <b>1 USD= </b>{currencies[currency]} {currency}</p>

                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />


                                            <input name="convAmt"
                                                placeholder="In Euro Pound"
                                                type="number"
                                                value={result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" disabled />

                                            <input name="date"
                                                placeholder="Date"
                                                selected={Date.now()}
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            <div>
                                                <small>Upload Recipt <b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                                <input
                                                    placeholder="Upload Receipt"
                                                    type="file"
                                                    tdata-button="Upload Recipt"
                                                    name="image"
                                                    onChange={onChangeImage} className="border p-3 w-100 my-2" /> <br />

                                            </div>


                                            <button type="submit" className="d-block py-3 px-5 bg-success text-white border-0 rounded font-weight-bold mt-3">Add</button>

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

AddInvestment.propTypes = {
    getProjects: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    addInvestment: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    users: state.auth.users,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { addInvestment, getProjects, getAllUsers, getCurrencies })(AddInvestment);




// <DatePicker
// name="date"
// className="border p-3 w-100 my-2"
// value={date}
// selected={date} onChange={e => onChangeHandler(e)} />


//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&format=1
//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1
// import axios from 'axios'