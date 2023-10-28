import { Component } from '@angular/core';
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
  constructor(private manager: ManagerService, private router: Router) {
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
