import { Store } from '@ngrx/store';
import { AppState } from '../../app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskState } from '../../reducers/task.reducer';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import { actions } from '../../reducers/task.reducer';
import { TasksService } from '../../providers/tasks.service';
import { Task } from '../../models/Task';

import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  private interval;
  nameFieldSubject$ = new Subject<string>();
  notesFieldSubject$ = new Subject<string>();
  task: TaskState;
  task$: Observable<TaskState>;
  taskSubscription: Subscription;
  nameFieldSubscription: Subscription;
  notesFieldSubscription: Subscription;

  constructor(private store: Store<AppState>, private tasksService: TasksService) {
    this.task$ = store.select('task');
  }

  ngOnInit() {
    this.taskSubscription = this.task$.subscribe(task => {
      this.task = task;
    });

    this.nameFieldSubscription = this.nameFieldSubject$
      .debounceTime(400)
      .do(value => this.store.dispatch({ type: actions.SET_NAME, payload: value }))
      .subscribe();

    this.notesFieldSubscription = this.notesFieldSubject$
      .debounceTime(400)
      .do(value => this.store.dispatch({ type: actions.SET_NOTES, payload: value }))
      .subscribe();
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
    this.nameFieldSubscription.unsubscribe();
    this.notesFieldSubscription.unsubscribe();
    this.stopTicking();
  }

  toggleTimer () {
    if (!this.task.isTicking) {
      this.startTicking();

      if (!this.task.startedAt) {
        this.setStarted();
      }
    } else {
      this.stopTicking();
    }
  }

  startTicking () {
    this.store.dispatch({ type: actions.START_TICKING });

    this.interval = setInterval(() => {
      this.store.dispatch({ type: actions.TICK });
    }, 1000);
  }

  stopTicking() {
    if (this.task.isTicking) {
      this.store.dispatch({ type: actions.STOP_TICKING });
      clearInterval(this.interval);
    }
  }

  setStarted () {
    this.store.dispatch({ type: actions.SET_STARTED, payload: new Date().getTime()});
  }

  reset (form) {
    this.stopTicking();
    this.store.dispatch({ type: actions.RESET });
    form.reset();
  }

  canSave (): boolean {
    return !this.task.isTicking && !!this.task.name && !!this.task.startedAt;
  }

  save (form) {
    const { name, notes, startedAt, duration } = this.task;

    const task: Task = {
      id: uuid(),
      endedAt: new Date().getTime(),
      name,
      notes,
      duration,
      startedAt
    };

    this.tasksService.save(task);
    this.reset(form);
  }

}
