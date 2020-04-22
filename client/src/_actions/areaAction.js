import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current area
export const getCurrentArea = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://donation-central.herokuapp.com/api/area/${id}`
    );

    dispatch({
      type: types.GET_AREA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.AREA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all areas
export const getAreas = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://donation-central.herokuapp.com/api/area"
    );
    dispatch({
      type: types.GET_AREAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.RATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add area
export const addArea = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://donation-central.herokuapp.com/api/area",
      formData
    );
    dispatch({
      type: types.ADD_AREA,
      payload: res.data,
    });
    history.push("/areas");

    dispatch(setAlert("Area Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("Area already exists!", "danger"));
    }

    dispatch({
      type: types.AREA_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit area
export const editArea = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `https://donation-central.herokuapp.com/api/area/${id}`,
      formData
    );

    dispatch({
      type: types.GET_AREA,
      payload: res.data,
    });

    dispatch(setAlert("Area Updated", "success"));
    history.push("/areas");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.AREA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete area
export const deleteArea = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    console.log(id);
    try {
      await axios.delete(
        `https://donation-central.herokuapp.com/api/area/${id}`
      );
      dispatch({
        type: types.DELETE_AREA,
        payload: id,
      });
      dispatch(setAlert("Area Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.AREA_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current area
export const setCurrentArea = (area) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_AREA,
    payload: area,
  });
};

// Clear area
export const cleararea = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_AREA });
};

//Filter area
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_AREA, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
