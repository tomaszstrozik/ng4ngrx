import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';

export const TASKS_ROUTES: Routes = [
  { path: '', component: TasksComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TASKS_ROUTES)
  ],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
