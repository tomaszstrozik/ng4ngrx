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

  editedId: string;
  tasks: Task[];
  tasksState$: Observable<TasksState>;
  tasksSubscription: Subscription;

  constructor(private store: Store<AppState>, private taskService: TasksService) {
    this.tasksState$ = this.store.select('tasks');
  }

  ngOnInit() {
    this.tasksSubscription = this.tasksState$.subscribe(tasksState => {
      this.tasks = tasksState.list;
      this.editedId = tasksState.editedId;
    });
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
    this.removeEditMode();
  }

  setEditMode (id: string) {
    this.store.dispatch({ type: actions.SET_EDIT_MODE, payload: id });
  }

  removeEditMode () {
    this.store.dispatch({ type: actions.REMOVE_EDIT_MODE });
  }

  editItem (task: Task) {
    this.taskService.edit(task);
    this.removeEditMode();
  }

  removeItem (task: Task) {
    this.taskService.remove(task);
  }

}
