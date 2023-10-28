import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ManagerService]
})
export class CreateComponent {
  constructor(private manager: ManagerService, private router: Router) {
  }
  cancel() {
    this.router.navigate(['/']);
  }
  submit() {
    if (this.validate()) {
      let name = (<HTMLInputElement>document.getElementById('name')).value;
      let description = (<HTMLInputElement>document.getElementById('description')).value;
      let priority = (<HTMLInputElement>document.getElementById('priority')).value;
      let dueDate = (<HTMLInputElement>document.getElementById('dueDate')).value;
      let task = new Task(name, description, priority, dueDate);
      this.manager.addTask(task);
      this.router.navigate(['/']);
    }
  }
  validate(): boolean {
    let valid: boolean = true;
    let dueDate = new Date((<HTMLInputElement>document.getElementById('dueDate')).value);
    let creationDate = new Date();
    if (creationDate > dueDate) {
      valid = false;
      alert('Due date must be in the future');
    }
    return valid;
  }
}
