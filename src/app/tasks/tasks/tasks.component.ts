import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app-state';
import { TasksState } from '../../reducers/tasks.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TasksService } from '../../providers/tasks.service';
import { Task } from '../../models/Task';
import { actions } from '../../reducers/tasks.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  isGroupBtnActive: boolean;
  edits: Object;
  tasks: Task[];
  tasksState$: Observable<TasksState>;
  tasksSubscription: Subscription;

  constructor(private store: Store<AppState>, private taskService: TasksService) {
    this.tasksState$ = this.store.select('tasks');
  }

  ngOnInit() {
    this.tasksSubscription = this.tasksState$.subscribe(tasksState => {
      const edits = tasksState.edits;
      this.tasks = tasksState.list;
      this.edits = edits;
      this.isGroupBtnActive = !!Object.keys(edits).length;
    });
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
    this.clearEdits();
  }

  addToEdits (task: Task) {
    this.store.dispatch({ type: actions.ADD_TO_EDITS, payload: task });
  }

  removeFromEdits (id) {
    this.store.dispatch({ type: actions.REMOVE_FROM_EDITS, payload: id });
  }

  editItem (task: Task) {
    this.taskService.edit(task);
    this.removeFromEdits(task.id);
  }

  removeItem (task: Task) {
    this.taskService.remove(task);
  }

  saveEdits () {
    this.taskService.saveEdits(this.edits);
    this.clearEdits();
  }

  clearEdits () {
    this.store.dispatch({ type: actions.CLEAR_EDITS });
  }

}
