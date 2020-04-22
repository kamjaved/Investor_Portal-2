import * as types from "./../_actions/types";

const initialOrganisation = {
    organisation: null,
    organisations: [],
    allOrganisations: [],
    totalOrganisation: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialOrganisation, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_ORGANISATION:
            return {
                ...state,
                organisation: payload,
                loading: false
            };
        case types.GET_ORGANISATIONS:
            return {
                ...state,
                organisations: payload,
                loading: false
            };

        case types.GET_ALL_ORGANISATIONS:
            return {
                ...state,
                allOrganisations: payload,
                loading: false
            };
        case types.GET_TOTAL_ORGANISATION:
            return {
                ...state,
                totalOrganisation: payload,
                loading: false
            };
        case types.ADD_ORGANISATION:
            return {
                ...state,
                organisation: payload,
                loading: false
            };
        case types.SET_CURRENT_ORGANISATION:
            return {
                ...state,
                organisation: action.payload
            };
        case types.CLEAR_ORGANISATION:
            return {
                ...state,
                organisation: null,
                organisations: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //   ...state,
        //     filtered: organisation.organisations.filter(organisation => {
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
        case types.DELETE_ORGANISATION:
            return {
                ...state,
                organisations: state.organisations.filter(
                    organisation => organisation._id !== action.payload
                ),
                loading: false
            };
        case types.ORGANISATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
