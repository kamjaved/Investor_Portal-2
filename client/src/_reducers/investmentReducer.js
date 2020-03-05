import * as types from "./../_actions/types";

const initialInvestment = {
    investment: null,
    investments: [],
    allinvestments: [],
    projectwiseInvestment: [],
    projectName: '',
    totalInvestment: [],
    overAllInvestment: [],
    currencies: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialInvestment, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_INVESTMENT:
            return {
                ...state,
                investment: payload,
                loading: false
            };
        case types.GET_INVESTMENTS:
            return {
                ...state,
                investments: payload,
                loading: false
            };
        case types.GET_ALL_INVESTMENTS:
            return {
                ...state,
                allinvestments: payload,
                loading: false
            };

        case types.GET_PROJECTWISE_INVESTMENTS:
            return {
                ...state,
                projectwiseInvestment: payload,
                projectName: payload[0].project.projectName,
                loading: false
            };

        case types.OVER_ALL_SUM_INV:
            return {
                ...state,
                overAllInvestment: payload,
                loading: false
            }
        case types.GET_TOTALWISE_INVESTMENTS:
            return {
                ...state,
                totalInvestment: payload,
                loading: false
            };

        case types.GET_CURRENCIES:
            return {
                ...state,
                currencies: payload,
                loading: false
            };
        case types.ADD_INVESTMENT:
            return {
                ...state,
                investment: payload,
                loading: false
            };
        case types.SET_CURRENT_INVESTMENT:
            return {
                ...state,
                investment: action.payload
            };
        case types.CLEAR_INVESTMENT:
            return {
                ...state,
                investment: null,
                investments: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: investment.investments.filter(investment => {
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
        case types.DELETE_INVESTMENT:
            return {
                ...state,
                investments: state.investments.filter(
                    investment => investment._id !== action.payload
                ),
                loading: false
            };
        case types.INVESTMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
