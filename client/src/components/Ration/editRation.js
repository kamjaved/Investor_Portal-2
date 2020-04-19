import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editRation, getCurrentRation } from '../../_actions/rationAction'
import { getGrocerys } from '../../_actions/groceryAction'
import '../UI/Dashboard.css'
import { Link } from "react-router-dom";
import moment from 'moment';

const EditRation = ({
    ration: { ration, loading },
    history,
    editRation,
    getCurrentRation,
    getGrocerys,
    grocerys,
    match,



}) => {

    const [formData, setFormData] = useState({
        rationKit: "",
        desc: "",
        location: "",
        grocerykit: "",
        date: new Date(),
    });

    //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD'); 
    useEffect(() => {
        getGrocerys();
        getCurrentRation(match.params.id);
        setFormData({
            rationKit: loading || !ration.rationKit ? "" : ration.rationKit,
            desc: loading || !ration.desc ? "" : ration.desc,
            location: loading || !ration.location ? "" : ration.location,
            grocerykit: loading || !ration.grocerykit ? "" : ration.grocerykit._id,
            date: loading || !ration.date ? "" : moment(ration.date).format('YYYY-MM-DD'),
        });
        //eslint-disable-next-line
    }, [loading, getCurrentRation, getGrocerys]);

    const { rationKit, desc, date, location, grocerykit } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, });
        //console.log(formData)

    };


    const onSubmitHandler = e => {
        e.preventDefault();
        editRation(formData, history, match.params.id);
    };

    let groceryTypeOptn = grocerys.map(groce => (
        <option key={groce._id} value={groce._id}>
            {groce.groceryKitName}
        </option>
    ));



    return (
        <Fragment>

            <div className="container-fluid">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)}>
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">
                                        <div>
                                            <h3 className="bg-warning text-center text-white p-4"><Link to="/admin/view-ration" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Edit Delivered Kit</h3></div>
                                        <fieldset className="p-4">

                                            <input name="rationKit"
                                                placeholder="Ration Kit Dispatch"
                                                type="number"
                                                value={rationKit}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />

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
                                                placeholder="Desc"
                                                type="text"
                                                value={desc}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />

                                            <div>
                                                <small>Select Date</small>
                                                <input name="date"
                                                    placeholder="Date"
                                                    type="date"
                                                    value={date}
                                                    onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            </div>



                                            <button type="submit" className="d-block py-3 px-5 bg-warning text-white border-0 rounded font-weight-bold mt-3">Edit</button>

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

EditRation.propTypes = {
    editRation: PropTypes.func.isRequired,
    getCurrentRation: PropTypes.func.isRequired,
    ration: PropTypes.object.isRequired,
    getGrocerys: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    ration: state.ration,
    grocerys: state.grocery.grocerys,

});
export default connect(mapStateToProps, { editRation, getCurrentRation, getGrocerys })(EditRation);
