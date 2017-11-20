import { Task } from '../models/Task';

export interface TasksState {
    edits: Object;
    list: Task[];
}

const initialState: TasksState = {
    edits: {},
    list: []
};

export const actions = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    EDIT_TASK: 'EDIT_TASK',
    ADD_TO_EDITS: 'ADD_TO_EDITS',
    REMOVE_FROM_EDITS: 'REMOVE_FROM_EDITS',
    SAVE_EDITS: 'SAVE_EDITS',
    CLEAR_EDITS: 'CLEAR_EDITS'
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
        case actions.ADD_TO_EDITS:
            return { ...state, edits: { ...state.edits, [action.payload.id]: action.payload } };
        case actions.REMOVE_FROM_EDITS:
            let { [action.payload]: omit, ...res} = state.edits;
            if (!res) {
                res = {};
            }
            return { ...state, edits: res };
        case actions.SAVE_EDITS:
            return { ...state, list: state.list.map(task => {
                const editedTask = action.payload[task.id];
                if (editedTask) {
                    return editedTask;
                }
                return task;
            })};
        case actions.CLEAR_EDITS:
            return { ...state, edits: {} };
        default:
            return state;
    }
};
