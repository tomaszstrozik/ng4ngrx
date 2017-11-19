import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { SharedModule } from '../shared/shared.module';

import { TasksService } from '../providers/tasks.service';

import { TaskRoutingModule } from './task-routing.module';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  providers: [TasksService],
  declarations: [TaskComponent, TimerComponent]
})
export class TaskModule { }
