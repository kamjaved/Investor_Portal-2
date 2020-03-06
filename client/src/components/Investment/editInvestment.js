import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editInvestment, getCurrentInvestment, getCurrencies } from '../../_actions/investmentAction'
import '../UI/Dashboard.css'

const EditInvestment = ({
    investment: { investment, loading },
    getCurrencies,
    history,
    editInvestment,
    getCurrentInvestment,
    match,
    currencies


}) => {

    const [formData, setFormData] = useState({
        amount: "",
        currency: "",
        date: "",
        convAmt: "",
    });

    const { amount, currency, date, } = formData;

    useEffect(() => {
        getCurrencies();
        getCurrentInvestment(match.params.id);
        setFormData({
            amount: loading || !investment.amount ? "" : investment.amount,
            currency: loading || !investment.currency ? "" : investment.currency,
            convAmt: loading || !investment.convAmt ? "" : investment.convAmt,
            // date: loading || !investment.date ? "" : investment.date
        });
        //eslint-disable-next-line
    }, [loading, getCurrentInvestment]);

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, convAmt: result });
        console.log(formData)

    };

    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })


    const onSubmitHandler = e => {
        e.preventDefault();
        editInvestment(formData, history, match.params.id);
    };


    return (
        <Fragment>

            <div className="container-fluid">
                <form onSubmit={e => onSubmitHandler(e)}>
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeInRight">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-success">
                                        <h3 className="bg-success text-center text-white p-4">Edit Investment</h3>
                                        <fieldset className="p-4">


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
                                                className="border p-3 w-100 my-2" />

                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />


                                            <button type="submit" className="d-block py-3 px-5 bg-success text-white border-0 rounded font-weight-bold mt-3">Edit</button>

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

EditInvestment.propTypes = {
    editInvestment: PropTypes.func.isRequired,
    getCurrentInvestment: PropTypes.func.isRequired,
    investment: PropTypes.object.isRequired,
    getCurrencies: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    investment: state.investment,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { editInvestment, getCurrentInvestment, getCurrencies })(EditInvestment);
