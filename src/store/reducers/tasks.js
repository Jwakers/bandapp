import * as actionTypes from "../actions/actionTypes";

const tasksState = [];

function setTasks(state, action) {
    return {
        ...state,
        ...action.payload
    }
}

function addTask(state, action) {
    return [
        ...state,
        {
            id: action.payload.id,
            projectId: action.payload.projectId,
            heading: action.payload.heading,
            description: action.payload.description,
            dueDate: action.payload.dueDate,
            assignee: "",
            status: "pending"
        }
    ];
}

// function updateTask(state, action) {
//     const taskIndex = state.findIndex(
//         task => task.id === action.taskId
//     );
//     const tasksCopy = [...state];
//     tasksCopy[taskIndex] = {
//         ...tasksCopy[taskIndex],
//         ...action.payload
//     };
//     return [...tasksCopy];
// }

export default (state = tasksState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS:
            return setTasks(state, action)
        case actionTypes.ADD_TASK:
            return addTask(state, action)
        // case actionTypes.UPDATE_TASK:
        //     return updateTask(state, action)
        default:
            return state;
    }
}