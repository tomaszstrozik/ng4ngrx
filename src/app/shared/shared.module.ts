import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { DurationPipe } from '../pipes/duration.pipe';

@NgModule({
  declarations: [DurationPipe],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    DurationPipe,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
