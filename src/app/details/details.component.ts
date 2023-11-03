import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [ManagerService]
})
export class DetailsComponent {
  task: Task;
  private manager: ManagerService;
  constructor(private router: Router, app: AppComponent) {
    this.manager = app.getManager();
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
