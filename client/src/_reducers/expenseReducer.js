import * as types from "./../_actions/types";

const initialExpense = {
    expense: null,
    expenses: [],
    allexpenses: [],
    projectwiseExpense: [],
    totalExpenses: [],
    overAllExpenses: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialExpense, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_EXPENSE:
            return {
                ...state,
                expense: payload,
                loading: false
            };
        case types.GET_EXPENSES:
            return {
                ...state,
                expenses: payload,
                loading: false
            };
        case types.GET_ALL_EXPENSES:
            return {
                ...state,
                allexpenses: payload,
                loading: false
            };
        case types.OVER_ALL_SUM_EXP:
            return {
                ...state,
                overAllExpenses: payload

            }
        case types.GET_PROJECTWISE_EXPENSES:
            return {
                ...state,
                projectwiseExpense: payload,
                loading: false
            };
        case types.GET_TOTALWISE_EXPENSES:
            return {
                ...state,
                totalExpenses: payload,
                loading: false
            };
        case types.ADD_EXPENSE:
            return {
                ...state,
                expense: payload,
                loading: false
            };
        case types.SET_CURRENT_EXPENSE:
            return {
                ...state,
                expense: action.payload
            };
        case types.CLEAR_EXPENSE:
            return {
                ...state,
                expense: null,
                expenses: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: expense.expenses.filter(expense => {
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
        case types.DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter(
                    expense => expense._id !== action.payload
                ),
                loading: false
            };
        case types.EXPENSE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
