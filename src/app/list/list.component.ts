import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ManagerService]
})
export class ListComponent {
  tasks: Array<[number, Task]>;
  allTasks: Array<[number, Task]>;
  private manager: ManagerService;
  constructor(private router: Router, app: AppComponent) {
    this.manager = app.getManager();
    let t = this.manager.getTasks();
    this.allTasks = new Array<[number, Task]>();
    for (let i = 0; i < t.length; i++) {
      this.allTasks.push([i, t[i]]);
    }
    this.tasks = this.allTasks;
  }
  details(task_id: number) {
    console.log(task_id);
    this.manager.setSelectedTaskId(task_id);
    this.router.navigate(['/details']);
  }
  create() {
    this.router.navigate(['/create']);
  }
  sort() {
    let t = new Array<[number, Task]>();
    this.allTasks.forEach(val => t.push(Object.assign({}, val)));
    let s = (<HTMLInputElement>document.getElementById('status')).value;
    if (s != 'All') {
      t = t.filter(x => x[1].status == s);
    }
    let p = (<HTMLInputElement>document.getElementById('priority')).value;
    if (p != 'All') {
      t = t.filter(x => x[1].priority == p);
    }
    let a = (<HTMLInputElement>document.getElementById('attr')).value as keyof Task;
    let o = (<HTMLInputElement>document.getElementById('order')).value == 'asc' ? -1 : 1;
    if (a == 'priority') o = -o;
    t.sort((x, y) => {
      if (x[1][a] < y[1][a]) return o;
      return -o;
    });
    this.tasks = t;
  }
}
