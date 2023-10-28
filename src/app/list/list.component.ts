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
  tasks: Array<[number, Task]>;
  constructor(public manager: ManagerService, private router: Router) {
    this.tasks = this.allTasks();
  }
  private allTasks(): Array<[number, Task]> {
    let t = this.manager.getTasks();
    let allTasks = new Array<[number, Task]>();
    for (let i = 0; i < t.length; i++) {
      allTasks.push([i, t[i]]);
    }
    return allTasks;
  }
  details(task_id: number) {
    this.manager.setSelectedTaskId(task_id);
    this.router.navigate(['/details']);
  }
  create() {
    this.router.navigate(['/create']);
  }
  sort() {
    let t = this.allTasks();
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
