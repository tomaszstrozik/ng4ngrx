import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  navLinks = [{
    path: 'task',
    label: 'Task'
  }, {
    path: 'tasks',
    label: 'Tasks'
  }];

  constructor () { }
}
