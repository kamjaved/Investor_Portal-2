import * as types from "./../_actions/types";

const initialCustomerPay = {
    customerPay: null,
    customerPays: [],
    allcustomerPay: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialCustomerPay, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CUSTOMER_PAY:
            return {
                ...state,
                customerPay: payload,
                loading: false
            };
        case types.GET_CUSTOMER_PAYS:
            return {
                ...state,
                customerPays: payload,
                loading: false
            };
        case types.GET_ALL_CUSTOMER_PAYS:
            return {
                ...state,
                allcustomerPay: payload,
                loading: false
            };
        case types.ADD_CUSTOMER_PAY:
            return {
                ...state,
                customerPay: payload,
                loading: false
            };
        case types.SET_CURRENT_CUSTOMER_PAY:
            return {
                ...state,
                customerPay: action.payload
            };
        case types.CLEAR_CUSTOMER_PAY:
            return {
                ...state,
                customerPay: null,
                customerPays: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: customerPay.customerPays.filter(customerPay => {
        //       const regex = new RegExp(`${action.payload}`, "gi");
        //       return (
        //         staff.firstName.match(regex) ||
        //         staff.lastName.match(regex) ||
        //         staff.email.match(regex) ||
        //         staff.mobile.match(regex) ||
        //         staff.username.match(regex)
        //       );
        //     })
        //   };
        case types.CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case types.DELETE_CUSTOMER_PAY:
            return {
                ...state,
                customerPays: state.customerPays.filter(
                    customerPay => customerPay._id !== action.payload
                ),
                loading: false
            };
        case types.CUSTOMER_PAY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
