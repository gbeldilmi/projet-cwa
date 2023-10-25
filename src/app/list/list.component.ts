import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ManagerService]
})
export class ListComponent {
  tasks: Array<Task>;
  
  constructor(private manager: ManagerService, private router: Router) {
    this.tasks = manager.getTasks();
  }
  details(task_id: number) {
    this.manager.setSelectedTaskId(task_id);
    this.router.navigate(['/details']);
  }
  create() {
    this.router.navigate(['/create']);
  }
}
