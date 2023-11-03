import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: []
})
export class EditComponent {
  task: Task;
  constructor(private manager: ManagerService, private router: Router) {
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  cancel() {
    this.router.navigate(['/details']);
  }
  submit() {
    if (this.validate()) {
      this.task.name = (<HTMLInputElement>document.getElementById('name')).value;
      this.task.description = (<HTMLInputElement>document.getElementById('description')).value;
      this.task.priority = (<HTMLInputElement>document.getElementById('priority')).value;
      this.task.status = (<HTMLInputElement>document.getElementById('status')).value;
      this.task.dueDate = (<HTMLInputElement>document.getElementById('dueDate')).value;
      this.manager.removeTask(this.manager.getSelectedTaskId());
      this.manager.addTask(this.task);
      this.router.navigate(['/details']);
    }
  }
  validate(): boolean {
    let valid: boolean = true;
    let dueDate = new Date((<HTMLInputElement>document.getElementById('dueDate')).value);
    let creationDate = new Date(this.task.creationDate);
    if (creationDate > dueDate) {
      valid = false;
      alert('Due date must be after creation date');
    }
    return valid;
  }
}
