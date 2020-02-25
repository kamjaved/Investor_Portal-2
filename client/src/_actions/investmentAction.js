import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current investment
export const getCurrentInvestment = id => async dispatch => {
    try {
        const res = await axios.get(`/api/investment/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_INVESTMENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.INVESTMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get user Investments
export const getInvestments = () => async dispatch => {
    try {
        const res = await axios.get("/api/investment");
        console.log(res.data.data);
        dispatch({
            type: types.GET_INVESTMENTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get All Investments
export const getAllInvestments = () => async dispatch => {
    try {
        const res = await axios.get("/api/investment/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_INVESTMENTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get Total Investments
export const getTotalInvestments = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/investment/total/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_TOTALWISE_INVESTMENTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get All Investments
export const getProjectInvestments = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/investment/filter/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_PROJECTWISE_INVESTMENTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};
export const getCurrencies = () => dispatch => {

    let initialData = [];
    const url = `http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(findData => {
            initialData = findData.rates;
            //console.log(initialData)
            dispatch({
                type: types.GET_CURRENCIES,
                payload: initialData
            });
        })

        .catch(err => console.log(err));

}

// get currencies
// export const getCurrencies = () => dispatch => {

//     try {
//         const res = fetch("http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1")
//             .then(data => {
//                 console.log(data.json())

//             });
//         console.log(res)

//         dispatch({
//             type: types.GET_CURRENCIES,
//             payload: res.rates
//         });
//     } catch (err) {
//         console.log(err);
//         // dispatch({
//         //   type: types.PROJECT_ERROR,
//         //   payload: { msg: err.response.data, status: err.response.status }
//         // });
//     }
// };


// Add investment
export const addInvestment = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/investment", formData);
        dispatch({
            type: types.ADD_INVESTMENT,
            payload: res.data
        });
        history.push("/admin/viewinvestment");

        dispatch(setAlert("Investment Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (err.response.status === 500) {
            dispatch(setAlert("Problem In Server!", "danger"));
        }
        else if (err.response.status === 401) {
            dispatch(setAlert(`No File Selected`, "danger"));
        }

        dispatch({
            type: types.INVESTMENT_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Edit investment
export const editInvestment = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/investment/${id}`, formData);

        dispatch({
            type: types.GET_INVESTMENT,
            payload: res.data
        });

        history.push("/admin/viewinvestment");

        dispatch(setAlert("Investment Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.INVESTMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete investment
export const deleteInvestment = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/investment/${id}`);
            dispatch({
                type: types.DELETE_INVESTMENT,
                payload: id
            });
            dispatch(setAlert("Investment Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.INVESTMENT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current investment
export const setCurrentInvestment = investment => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_INVESTMENT,
        payload: investment
    });
};

// Clear investment
export const clearInvestment = () => async dispatch => {
    dispatch({ type: types.CLEAR_INVESTMENT });
};

//Filter investment
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_INVESTMENT, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};




// const url='http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1'

// openexchange
//https://openexchangerates.org/api/latest.json?app_id=7a45036659ec4cedb3ee6a59c76b9ddb&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP
// fetch(url)
// .then(data => {
//   return data.json();
// })
// .then(findData => {
//   initialData = findData.rates;
// })
// .catch(err => console.log(err));
