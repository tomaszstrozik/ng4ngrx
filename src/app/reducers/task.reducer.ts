export interface TaskState {
    name: string;
    valid: boolean;
    isTicking: boolean;
    duration: number;
    startedAt: any;
    notes: string;
}

const initialState: TaskState = {
    name: '',
    valid: false,
    startedAt: null,
    duration: 0,
    isTicking: false,
    notes: ''
};

export const actions = {
    SET_NAME: 'SET_NAME',
    SET_NOTES: 'SET_NOTES',
    SET_STARTED: 'SET_STARTED',
    SET_VALID: 'SET_VALID',
    SET_INVALID: 'SET_INVALID',
    START_TICKING: 'START_TICKING',
    STOP_TICKING: 'STOP_TICKING',
    TICK: 'TICK',
    RESET: 'RESET'
};

export const taskReducer = (state: TaskState = initialState, action: any): TaskState => {
    switch (action.type) {
        case actions.SET_NAME:
            return { ...state, name: action.payload };
        case actions.SET_NOTES:
            return { ...state, notes: action.payload };
        case actions.SET_STARTED:
            return { ...state, startedAt: action.payload };
        case actions.SET_VALID:
            return { ...state, valid: true };
        case actions.SET_INVALID:
            return { ...state, valid: false };
        case actions.START_TICKING:
            return { ...state, isTicking: true };
        case actions.STOP_TICKING:
            return { ...state, isTicking: false };
        case actions.TICK:
            const duration = state.duration + 1;
            return { ...state, duration };
        case actions.RESET:
            return { ...initialState };
        default:
            return state;
    }
};
