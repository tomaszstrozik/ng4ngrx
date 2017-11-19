import { Task } from '../models/Task';

export interface TasksState {
    editedId: string;
    list: Task[];
}

const initialState: TasksState = {
    editedId: null,
    list: []
};

export const actions = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    EDIT_TASK: 'EDIT_TASK',
    SET_EDIT_MODE: 'SET_EDIT_MODE',
    REMOVE_EDIT_MODE: 'REMOVE_EDIT_MODE'
};

export const tasksReducer = (state: TasksState = initialState, action: any): TasksState => {
    switch (action.type) {
        case actions.ADD_TASK:
            return Object.assign({}, state, {
                list: [...state.list, action.payload]
            });
        case actions.REMOVE_TASK:
            return Object.assign({}, state, {
                list: state.list.filter( task => {
                    return task.id !== action.payload;
                })
            });
        case actions.EDIT_TASK:
            return Object.assign({}, state, {
                list: state.list.map( task => {
                    if (task.id === action.payload.id) {
                        return action.payload;
                    }
                    return task;
                })
            });
        case actions.SET_EDIT_MODE:
            return { ...state, editedId: action.payload };
        case actions.REMOVE_EDIT_MODE:
            return { ...state, editedId: null };
        default:
            return state;
    }
};
