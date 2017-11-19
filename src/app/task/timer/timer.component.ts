import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {

  @Input() duration: Number;
  @Input() isTicking: Boolean;
  @Output() toggleTimer = new EventEmitter<boolean>();
  btnText: string;

  constructor() { }

  toggle () {
    this.toggleTimer.emit();
  }

  getIcon (): string {
    return this.isTicking ? 'pause' : 'play_arrow';
  }

}
