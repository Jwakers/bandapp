import { combineReducers } from "redux";
import * as actionTypes from "./actions";

const initialState = {
    projects: [
        {
            id: "_ja83hfisd",
            heading: "Snakeskin",
            description:
                "This is an example description. It is purely for demonstration only. I've added superfluous words to make a convincing looking bit of text, any good?",
            subtasks: {
                total: 9,
                complete: 3,
                tasks: [
                    {
                        title: "Guitar one",
                        description: "",
                        assignee: "Jack",
                        status: "complete"
                    },
                    {
                        title: "Guitar lead",
                        description: "",
                        assignee: "Andy",
                        status: "progress"
                    },
                    {
                        title: "Drums",
                        description: "",
                        assignee: "",
                        status: ""
                    }
                ]
            },
            dueDate: "30/03/20"
        }
    ]
};

function projects(state = initialState.projects, action) {
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            console.log(action)
            return [
                ...state,
                {
                    id: action.payload.id,
                    heading: action.payload.heading,
                    description: action.payload.description,
                    dueDate: action.payload.dueDate
                }
            ];
        default:
            return state;
    }
}

const bandApp = combineReducers({
    projects
});

export default bandApp;
