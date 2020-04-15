import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current ration
export const getCurrentRation = id => async dispatch => {
    try {
        const res = await axios.get(`/api/ration/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_RATION,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.RATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get user Rations
export const getRations = () => async dispatch => {
    try {
        const res = await axios.get("/api/ration");
        console.log(res.data.data);
        dispatch({
            type: types.GET_RATIONS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.RATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get all Rations
export const getAllRations = () => async dispatch => {
    try {
        const res = await axios.get("/api/ration/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_RATIONS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.RATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get user Rations
export const getTotalRations = () => async dispatch => {
    try {
        const res = await axios.get("/api/ration/total");
        console.log(res.data.data);
        dispatch({
            type: types.GET_TOTAL_RATION,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.RATION_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add ration
export const addRation = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/ration", formData);
        dispatch({
            type: types.ADD_RATION,
            payload: res.data
        });
        history.push("/admin/view-ration");

        dispatch(setAlert("Ration Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(setAlert("Ration already exists!", "danger"));
        }

        dispatch({
            type: types.RATION_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Edit ration
export const editRation = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/ration/${id}`, formData);

        dispatch({
            type: types.GET_RATION,
            payload: res.data
        });

        history.push("/admin/view-ration");

        dispatch(setAlert("Ration Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.RATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete ration
export const deleteRation = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/ration/${id}`);
            dispatch({
                type: types.DELETE_RATION,
                payload: id
            });
            dispatch(setAlert("Ration Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.RATION_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current ration
export const setCurrentRation = ration => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_RATION,
        payload: ration
    });
};

// Clear ration
export const clearRation = () => async dispatch => {
    dispatch({ type: types.CLEAR_RATION });
};

//Filter ration
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_RATION, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
