import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current grocery
export const getCurrentOrganisation = id => async dispatch => {
    try {
        const res = await axios.get(`/api/organisation/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_ORGANISATION,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.ORGANISATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get user Organisations
export const getOrganisations = () => async dispatch => {
    try {
        const res = await axios.get("/api/organisation");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ORGANISATIONS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.ORGANISATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get all Organisations
export const getAllOrganisations = () => async dispatch => {
    try {
        const res = await axios.get("/api/organisation/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_ORGANISATIONS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.ORGANISATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get user Organisations
export const getTotalOrganisations = () => async dispatch => {
    try {
        const res = await axios.get("/api/organisation/total");
        console.log(res.data.data);
        dispatch({
            type: types.GET_TOTAL_ORGANISATION,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.ORGANISATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add grocery
export const addOrganisation = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/organisation", formData);
        dispatch({
            type: types.ADD_ORGANISATION,
            payload: res.data
        });
        history.push("/admin/view-grocery");

        dispatch(setAlert("Organisation Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(setAlert("Organisation already exists!", "danger"));
        }

        dispatch({
            type: types.ORGANISATION_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Edit grocery
export const editOrganisation = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/organisation/${id}`, formData);

        dispatch({
            type: types.GET_ORGANISATION,
            payload: res.data
        });

        history.push("/admin/view-grocery");

        dispatch(setAlert("Organisation Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.ORGANISATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete grocery
export const deleteOrganisation = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/organisation/${id}`);
            dispatch({
                type: types.DELETE_ORGANISATION,
                payload: id
            });
            dispatch(setAlert("Organisation Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.ORGANISATION_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current grocery
export const setCurrentOrganisation = grocery => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_ORGANISATION,
        payload: grocery
    });
};

// Clear grocery
export const clearOrganisation = () => async dispatch => {
    dispatch({ type: types.CLEAR_ORGANISATION });
};

//Filter grocery
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_ORGANISATION, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
