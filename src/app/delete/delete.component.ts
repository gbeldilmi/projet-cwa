import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [ManagerService]
})
export class DeleteComponent {
  task: Task;
  private manager: ManagerService;
  constructor(private router: Router, app: AppComponent) {
    this.manager = app.getManager();
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  cancel() {
    this.router.navigate(['/details']);
  }
  delete() {
    this.manager.removeTask(this.manager.getSelectedTaskId());
    this.manager.setSelectedTaskId(-1);
    this.router.navigate(['/']);
  }
}
