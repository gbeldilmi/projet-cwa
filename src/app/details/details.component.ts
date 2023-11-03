import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: []
})
export class DetailsComponent {
  task: Task;
  constructor(private manager: ManagerService, private router: Router) {
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  back() {
    this.router.navigate(['/']);
  }
  edit() {
    this.router.navigate(['/edit']);
  }
  delete() {
    this.router.navigate(['/delete']);
  }
  setDone() {
    this.task.status = 'Done';
    this.manager.removeTask(this.manager.getSelectedTaskId());
    this.manager.addTask(this.task);
    this.router.navigate(['/details']);
  }
}
