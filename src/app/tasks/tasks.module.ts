import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksService } from '../providers/tasks.service';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

@NgModule({
  imports: [
    SharedModule,
    TasksRoutingModule
  ],
  providers: [TasksService],
  declarations: [TasksComponent, TaskListItemComponent]
})
export class TasksModule { }
