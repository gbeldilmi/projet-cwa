import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private tasks!: Array<Task>;
  private selectedTaskId: number;
  constructor() {
    this.tasks = new Array<Task>();
    this.selectedTaskId = this.tasks.length -1;
    this.loadTasks();
  }
  setSelectedTaskId(id: number) {
    this.selectedTaskId = id;
  }
  getSelectedTaskId(): number {
    return this.selectedTaskId;
  }
  addTask(task?: Task) {
    if (task) {
      this.tasks.push(task);
      this.selectedTaskId = this.tasks.length - 1;
    } else {
      console.log('No task to add');
    }
    this.saveTasks();
  }
  getTasks(): Array<Task> {
    return this.tasks;
  }
  getTask(id: number): Task {
    return this.tasks[id];
  }
  removeTask(id: number) {
    this.tasks.splice(id, 1);
    this.selectedTaskId = this.tasks.length - 1;
    this.saveTasks();
  }
  loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      console.log('No tasks found');
    }
  }
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

export class Task {
  public name: string;
  public description: string;
  public priority: string;
  public status: string;
  public dueDate: string;
  public creationDate: string;
  constructor(name: string, description: string, priority: string, dueDate: string) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = 'Ongoing';
    this.dueDate = dueDate;
    this.creationDate = new Date().toLocaleDateString('sv');
  }
}
