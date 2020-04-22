import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addArea } from "../../_actions/areaAction";
import { getCities } from "../../_actions/cityAction";
import "../UI/Dashboard.css";

const AddArea = ({ history, addArea, getCities, cities }) => {
  const [formData, setFormData] = useState({
    area: "",
    city: "",
  });

  const { area, city } = formData;

  useEffect(() => {
    getCities();
    //eslint-disable-next-line
  }, [getCities]);

  let cityOptions = cities.map((city) => (
    <option key={city._id} value={city._id}>
      {city.city}
    </option>
  ));

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addArea(formData, history);
  };

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-info">
                    <div>
                      <h3 className="bg-info text-center text-white p-4">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Add Area
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-2 w-100 my-2"
                        name="city"
                        value={city}
                        onChange={(e) => onChangeHandler(e)}
                        required
                      >
                        <option>Select City</option>
                        {cityOptions}
                      </select>

                      <input
                        name="area"
                        placeholder="Area Name"
                        type="text"
                        value={area}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <button
                        type="submit"
                        className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
                      >
                        Add
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

AddArea.propTypes = {
  addCity: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.city.cities,
  loading: state.city.loading,
});

export default connect(mapStateToProps, { addArea, getCities })(AddArea);
