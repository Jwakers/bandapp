import { combineReducers } from "redux";
import * as actionTypes from "./actions";

const projectsState = [
    {
        id: "_ja83hfisd",
        heading: "Snakeskin",
        description:
            "This is an example description. It is purely for demonstration only. I've added superfluous words to make a convincing looking bit of text, any good?",
        dueDate: "30/03/20",
        info: {
            bpm: 125,
            key: null,
            length: null,
            comments: null,
            demo: ''
        }
    },
    {
        id: "_ahasd80",
        heading: "Epoch",
        description: "Another example for a song description",
        dueDate: "30/03/20",
        info: {
            bpm: 170,
            key: "G Major",
            length: 4.2,
            comments: null,
            demo: ''
        }
    }
];

const tasksState = [
    {
        id: "task-29hsjd",
        projectId: "_ja83hfisd",
        heading: "Test 1",
        description: "Test task",
        assignee: "Jack",
        status: "pending"
    },
    {
        id: "task-asdiue",
        projectId: "_ja83hfisd",
        heading: "Test 2",
        description: "Test task 2",
        assignee: "Josh",
        status: "pending"
    },
    {
        id: "task-29hasdk",
        projectId: "_ahasd80",
        heading: "Lead guitar",
        description: "Shred shred shred motha fucka!",
        assignee: "Andy",
        status: "pending"
    },
    {
        id: "task-23udywe",
        projectId: "_ahasd80",
        heading: "Solo",
        description: "Do a wicked solo yeah.",
        assignee: "Jack",
        status: "pending"
    },
    {
        id: "task-jasd83",
        projectId: "_ahasd80",
        heading: "Drums",
        description: "Whos guoing to do this?",
        assignee: "",
        status: "pending"
    }
];
function projects(state = projectsState, action) {
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            return [
                ...state,
                {
                    id: action.payload.id,
                    heading: action.payload.heading,
                    description: action.payload.description,
                    dueDate: action.payload.dueDate,
                    info: {
                        bpm: null,
                        key: null,
                        length: null,
                        comments: null,
                        demo: null
                    }
                }
            ];
        case actionTypes.UPDATE_PROJECT:
            const projectIndex = state.findIndex(
                project => project.id === action.projectId
            );
            const projectsCopy = [...state];
            console.log(projectsCopy)
            projectsCopy[projectIndex] = {
                ...projectsCopy[projectIndex],
                ...action.payload
            };
            return [...projectsCopy];
        default:
            return state;
    }
}

function tasks(state = tasksState, action) {
    console.log('task action')
    console.log(action)
    switch (action.type) {
        case actionTypes.ADD_TASK:
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
        case actionTypes.UPDATE_TASK_STATUS:
            const taskIndex = state.findIndex(
                task => task.id === action.taskId
            );
            const tasksCopy = [...state];
            tasksCopy[taskIndex] = {
                ...tasksCopy[taskIndex],
                status: action.status
            };
            return [...tasksCopy];
        default:
            return state;
    }
}

const bandApp = combineReducers({
    projects,
    tasks
});

export default bandApp;
