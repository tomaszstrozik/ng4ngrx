import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../../models/Task';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListItemComponent implements OnChanges, OnInit {

  private tempName: string;
  isEdited: boolean;
  editKeyup$ = new Subject<string>();
  editKeyupSubscription: Subscription;
  @Input() edits: Object;
  @Input() task: Task;
  @Output() removeItem = new EventEmitter<Task>();
  @Output() editItem = new EventEmitter<Task>();
  @Output() addToEdits = new EventEmitter<Task>();
  @Output() removeFromEdits = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.editKeyupSubscription = this.editKeyup$
      .debounceTime(300)
      .do(value => {
        this.tempName = value;
        this.addToEdits.emit({ ...this.task, name: this.tempName });
      })
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    const taskChanges = changes.task;

    this.checkIfEdited();

    if (taskChanges && taskChanges.currentValue) {
      this.tempName = taskChanges.currentValue.name;
    }
  }

  getBtnText (): string {
    return this.isEdited ? 'Cancel' : 'Edit';
  }

  getIcon () {
    return this.isEdited ? 'clear' : 'mode_edit';
  }

  remove () {
    const task = Object.assign({}, this.task);
    this.removeItem.emit(task);
  }

  save () {
    const task = Object.assign({}, this.task, {
      name: this.tempName
    });

    this.editItem.emit(task);
  }

  checkIfEdited () {
     this.isEdited = !!this.edits[this.task.id];
  }

  toggleEdit () {
    if (!this.isEdited) {
      this.addToEdits.emit(this.task);
    } else {
      this.removeFromEdits.emit(this.task.id);
    }
  }

}
