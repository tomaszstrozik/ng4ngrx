import { TaskState } from './reducers/task.reducer';
import { TasksState } from './reducers/tasks.reducer';

export interface AppState {
    task: TaskState;
    tasks: TasksState;
}
