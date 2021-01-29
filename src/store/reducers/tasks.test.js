import reducer from "./tasks";
import * as actionTypes from "../actions/actionTypes"

describe('tasks reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            loading: false,
            error: null,
            tasks: {
                someTaskId: {
                    heading: 'task 1'
                }
            }
        }
    })

    it('should add a new task and retain other tasks', () => {
        expect(reducer(initialState, {
            type: actionTypes.TASKS_SUCCESS,
            task: {
                someOtherTaskId: {
                    heading: 'task 2'
                }
            }
        })).toEqual(
            {
                loading: false,
                error: null,
                tasks: {
                    someTaskId: {
                        heading: 'task 1'
                    },
                    someOtherTaskId: {
                        heading: 'task 2'
                    }
                }
            }
        )
    })

    it('should remove task from state', () => {
        expect(reducer(initialState, {
            type: actionTypes.TASKS_DELETE,
            taskId: 'someTaskId'
        })).toEqual({
            loading: false,
            error: null,
            tasks: {}
        })
    })
})