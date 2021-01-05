import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import projects from "./projects";
import auth from "./auth";
import tasks from "./tasks";
import user from "./user";
import bands from "./bands";

import { AUTH_LOGOUT } from '../actions/actionTypes'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const appReducer = combineReducers({
    projects,
    tasks,
    auth,
    user,
    bands
})

const rootReducer = (state, action) => {
    if (action.type === AUTH_LOGOUT) {
      state = undefined
    }
  
    return appReducer(state, action)
  }

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store