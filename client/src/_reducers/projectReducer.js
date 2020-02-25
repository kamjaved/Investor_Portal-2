import * as types from "./../_actions/types";

const initialProject = {
    project: null,
    projects: [],
    allprojects: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (project = initialProject, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_PROJECT:
            return {
                ...project,
                project: payload,
                loading: false
            };
        case types.GET_PROJECTS:
            return {
                ...project,
                projects: payload,
                loading: false
            };
        case types.GET_ALL_PROJECTS:
            return {
                ...project,
                allprojects: payload,
                loading: false
            };
        case types.ADD_PROJECT:
            return {
                ...project,
                project: payload,
                loading: false
            };
        case types.SET_CURRENT_PROJECT:
            return {
                ...project,
                project: action.payload
            };
        case types.CLEAR_PROJECT:
            return {
                ...project,
                project: null,
                projects: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //     ...project,
        //     filtered: project.projects.filter(project => {
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
                ...project,
                filtered: null
            };
        case types.DELETE_PROJECT:
            return {
                ...project,
                projects: project.projects.filter(
                    project => project._id !== action.payload
                ),
                loading: false
            };
        case types.PROJECT_ERROR:
            return {
                ...project,
                error: payload,
                loading: false
            };
        default:
            return project;
    }
}
