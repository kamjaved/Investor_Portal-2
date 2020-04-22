import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentCity, editCity } from "../../_actions/cityAction";
import "../UI/Dashboard.css";

const EditCity = ({
  history,
  editCity,
  getCurrentCity,
  match,
  loading,
  cityFront,
}) => {
  const [formData, setFormData] = useState({
    city: "",
    areas: "",
  });

  useEffect(() => {
    getCurrentCity(match.params.id);
    setFormData({
      city: loading || !cityFront.city ? "" : cityFront.city,
      areas: loading || !cityFront.areas ? "" : cityFront.areas,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentCity]);

  const { city, areas } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    editCity(formData, history, match.params.id);
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
                        <Link to="/cities" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit City
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="city"
                        placeholder="City Name"
                        type="text"
                        value={city}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="areas"
                        placeholder="Enter areas"
                        type="text"
                        value={areas}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <small className="text-muted">
                        Enter comma separated values, Eg: area1, area2 area3
                      </small>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
                      >
                        Save
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

EditCity.propTypes = {
  editCity: PropTypes.func.isRequired,
  getCurrentCity: PropTypes.func.isRequired,
  cityFront: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cityFront: state.city.city,
  loading: state.city.loading,
});

export default connect(mapStateToProps, { editCity, getCurrentCity })(EditCity);
