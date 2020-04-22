import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addRation, searchDelivery } from "../../_actions/rationAction";
import { getGrocerys } from "../../_actions/groceryAction";
import { getCities, populateAreas } from "../../_actions/cityAction";
import "../UI/Dashboard.css";

const AddCustomerPay = ({
  history,
  addRation,
  searchDelivery,
  getGrocerys,
  getCities,
  cities,
  areas,
  grocerys,
  deliveries,
  populateAreas,
  orgIdState,
  orgNameState,
  orgState,
}) => {
  const [formData, setFormData] = useState({
    orgId: "",
    orgName: "",
    kitType: "",
    kitQuantity: "",
    state: "",
    city: "",
    area: "",
    road: "",
    landmark: "",
    description: "",
    date: new Date(),
  });

  const [searchStringData, setSearchStringData] = useState({
    searchString: "",
  });

  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const {
    kitType,
    kitQuantity,
    state,
    city,
    area,
    road,
    landmark,
    description,
    date,
    houseNo,
  } = formData;
  const { searchString } = searchStringData;

  useEffect(() => {
    getGrocerys();
    getCities();
    setFormData({
      orgId: !orgIdState ? "" : orgIdState,
      orgName: !orgNameState ? "" : orgNameState,
      state: !orgState ? "" : orgState,
    });
  }, [getGrocerys, getCities]);

  // ON CHANGE HANDLERS....
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCity = (e) => {
    e.preventDefault();

    setFormData({ ...formData, city: e.target.value });
    populateAreas(e.target.value);
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchStringData({
      ...searchStringData,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT HANDLERS....
  const onSubmitHandler = (e) => {
    e.preventDefault();
    addRation(formData, history);
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    searchDelivery(searchStringData, history, city, area);
  };

  let groceryTypeOptn = grocerys.map((groce) => (
    <option key={groce._id} value={groce.groceryKitName}>
      {groce.groceryKitName}
    </option>
  ));

  let cityOptions = cities.map((cit) => (
    <option key={cit._id} value={cit.city}>
      {cit.city}
    </option>
  ));

  let areaOptions = areas.map((ar) => (
    <Fragment>
      <option value={ar}>{ar}</option>
    </Fragment>
  ));

  console.log(moment(date).format("YYYY-MM-DD"));

  return (
    <Fragment>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-sm-8">
            <form onSubmit={(e) => onSearchHandler(e)}>
              <div className="container">
                <div className="row justify-content-center animated fadeIn">
                  <div className="col-lg-12 col-md-12">
                    <div className="bg-light border border-warning">
                      <fieldset className="p-4">
                        <select
                          className="border p-2 w-25 my-2"
                          name="city"
                          value={city}
                          onChange={(e) => onChangeCity(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select City-
                          </option>
                          {cityOptions}
                        </select>

                        <select
                          className="border p-2 w-25 my-2"
                          name="area"
                          value={area}
                          onChange={(e) => onChangeHandler(e)}
                          required
                          defaultValue={{
                            label: "Select Area",
                            value: 0,
                          }}
                        >
                          <option value="">-Select Area-</option>
                          {areaOptions}
                        </select>

                        <input
                          name="searchString"
                          placeholder="Search..."
                          type="text"
                          value={searchString}
                          onChange={(e) => onChangeSearch(e)}
                          className="border p-2 w-25 my-2"
                          required
                        />

                        <button
                          type="submit"
                          className="d-block w-75 py-2 px-5 bg-warning border-0 rounded font-weight-bold mt-3"
                        >
                          Search
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <table className="table table-hover table-sm my-5">
              <thead className="thead-dark" align="center">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Kit type</th>
                  <th scope="col">Qty</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Area</th>
                  <th scope="col">Road</th>
                  <th scope="col">Landmark</th>
                  <th scope="col">House No </th>
                </tr>
              </thead>
              <tbody>
                {deliveries
                  ? deliveries.map((del) => (
                    <tr key={del._id}>
                      <td>{moment(del.date).format("DD-MM-YYYY")}</td>
                      <td>{del.kitType}</td>
                      <td>{del.kitQuantity}</td>
                      <td>{del.state}</td>
                      <td>{del.city}</td>
                      <td>{del.area}</td>
                      <td>{del.road}</td>
                      <td>{del.landmark}</td>
                      <td>{del.houseNo}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>

          <div className="col-sm-4">
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <div className="">
                <div className="row animated fadeIn">
                  <div className="col-lg-12 col-md-12 ">
                    <div className="bg-light border border-warning">
                      <div>
                        <h3 className="bg-warning text-center p-4">
                          <Link to="/dashboard" className="text-white">
                            <i className="fa fa-arrow-left mr-2 float-left"></i>
                          </Link>{" "}
                          Add Delivered Kit
                        </h3>
                      </div>
                      <fieldset className="p-4">
                        <select
                          className="border p-2 w-100 my-2"
                          name="kitType"
                          value={kitType}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        >
                          <option>Select Grocery Kit</option>
                          {groceryTypeOptn}
                        </select>

                        <input
                          name="kitQuantity"
                          placeholder="No. of Ration Kit"
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
                        />

                        <select
                          className="border p-2 w-100 my-2"
                          name="city"
                          value={city}
                          onChange={(e) => onChangeCity(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select City-
                          </option>
                          {cityOptions}
                        </select>

                        <select
                          className="border p-2 w-100 my-2"
                          name="area"
                          value={area}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        >
                          <option value="">-Select Area-</option>
                          {areaOptions}
                        </select>
                        <input
                          name="road"
                          placeholder="road"
                          type="text"
                          value={road}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required />

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
                          name="description"
                          placeholder="description"
                          type="text"
                          value={description}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <div>
                          <small>Select Date</small>
                          <input
                            name="date"
                            placeholder={date}
                            type="date"
                            value={date}
                            onChange={(e) => onChangeHandler(e)}
                            className="border p-2 w-100 my-2"

                          />
                        </div>

                        <button
                          type="submit"
                          className="d-block btn-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3"
                        >
                          Add
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddCustomerPay.propTypes = {
  addRation: PropTypes.func.isRequired,
  searchDelivery: PropTypes.func.isRequired,
  getGrocerys: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  populateAreas: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  grocerys: state.grocery.grocerys,
  deliveries: state.ration.deliveries,
  areas: state.city.areas,
  cities: state.city.cities,
  orgIdState: state.auth.user.organisation && state.auth.user.organisation._id,
  orgNameState: state.auth.user.organisation && state.auth.user.organisation.orgName,
  orgState: state.auth.user.organisation && state.auth.user.organisation.state,
});
export default connect(mapStateToProps, {
  addRation,
  searchDelivery,
  getGrocerys,
  getCities,
  populateAreas,
})(AddCustomerPay);

