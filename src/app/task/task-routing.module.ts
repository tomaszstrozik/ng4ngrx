import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from './task/task.component';

export const TASK_ROUTES: Routes = [
  { path: '', component: TaskComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TASK_ROUTES)
  ],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
