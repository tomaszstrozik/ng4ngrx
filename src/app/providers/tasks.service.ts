import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { actions } from '../reducers/tasks.reducer';
import { TasksState } from '../reducers/tasks.reducer';
import { Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class TasksService {

  snackbarDuration = 2000;

  constructor(private store: Store<TasksState>, private snackBar: MatSnackBar) { }

  createMsg (msgType: string, taskName: string): string {
    switch (msgType) {
      case actions.ADD_TASK:
        return `Added "${taskName}" task!`;
      case actions.EDIT_TASK:
        return `Edited "${taskName}" task!`;
      case actions.REMOVE_TASK:
        return `Removed "${taskName}" task!`;
      default:
        return '';
    }
  }

  showMsg (actionType: string, taskName: string) {
    const msg = this.createMsg(actionType, taskName);

    this.snackBar.open(msg, 'Close', {
      duration: this.snackbarDuration
    });
  }

  save (task: Task) {
    const actionType = actions.ADD_TASK,
          { name } = task;

    this.store.dispatch({ type: actionType, payload: task });
    this.showMsg(actionType, name);
  }

  edit (task: Task) {
    const actionType = actions.EDIT_TASK,
          { name } = task;

    this.store.dispatch({ type: actionType, payload: task });
    this.showMsg(actionType, name);
  }

  remove (task: Task) {
    const actionType = actions.REMOVE_TASK,
          { name } = task;

    this.store.dispatch({ type: actionType, payload: task.id });
    this.showMsg(actionType, name);
  }
}
