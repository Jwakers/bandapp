import * as actionTypes from "../actions/actionTypes";

const projectsState = {}

function setProjects(state, action) {
    return {
        ...state,
        ...action.payload
    }
}

// function updateProject(state, action) {
//     const projectIndex = state.findIndex(
//         project => project.id === action.projectId
//     );
//     const projectsCopy = [...state];
//     projectsCopy[projectIndex] = {
//         ...projectsCopy[projectIndex],
//         ...action.payload
//     };
//     return [...projectsCopy];
// }

export default (state = projectsState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROJECTS:
            return setProjects(state, action)
        // case actionTypes.UPDATE_PROJECT: 
        //     return updateProject(state, action)
        default:
            return state;
    }
}