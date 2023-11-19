import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* Responsable de la gestion des opérations liées aux tâches, le service ManagerService gère la manipulation des tâches,
 * leur ajout, leur suppression, leur récupération et leur sauvegarde dans le stockage local */
export class ManagerService {
  private tasks: Array<Task>; // Déclare une variable privée tasks de type tableau Array<Task> pour stocker les tâches
  private selectedTaskId: number; // Déclare une variable privée selectedTaskId de type number pour stocker l'ID de la
                                  // tâche sélectionnée
  
  /* Le constructeur de la classe ManagerService. Lors de la création d'une instance du service, il initialise tasks comme un nouveau tableau vide, définit selectedTaskId à -1, puis appelle this.loadTasks() pour charger les
   * tâches depuis le stockage local (localStorage) */
  constructor() {
    this.tasks = new Array<Task>();
    this.selectedTaskId = -1;
    this.loadTasks();
  }

  /* Méthode privée lastId() qui renvoie l'indice de la dernière tâche dans le tableau tasks */
  private lastId(): number {
    return this.tasks.length - 1;
  }

  /* Méthode pour définir l'ID de la tâche sélectionnée */
  setSelectedTaskId(id: number) {
    this.selectedTaskId = id;
  }
  
  /* Méthode pour obtenir l'ID de la tâche sélectionnée */
  getSelectedTaskId(): number {
    return this.selectedTaskId;
  }

  /* Méthode pour ajouter une nouvelle tâche. Elle prend en compte la possibilité que la tâche soit en paramètre ou non,
   * l'ajoute au tableau tasks, définit l'ID de la tâche sélectionnée comme la dernière tâche ajoutée, puis sauvegarde
   * les tâches dans le stockage local. */
  addTask(task?: Task) {
    if (task) {
      this.tasks.push(task);
    } else {
      console.log('No task to add');
    }
    this.selectedTaskId = this.lastId();
    this.saveTasks();
  }

  /* Méthode pour obtenir toutes les tâches. */
  getTasks(): Array<Task> {
    return this.tasks;
  }

  /* Méthode pour obtenir une tâche spécifique à partir de son ID */
  getTask(id: number): Task {
    return this.tasks[id];
  }
  
  /* Méthode pour supprimer une tâche en fonction de son ID, met à jour l'ID de la tâche sélectionnée et sauvegarde les
   * modifications dans le stockage local */
  removeTask(id: number) {
    this.tasks.splice(id, 1);
    this.selectedTaskId = this.lastId();
    this.saveTasks();
  }

  /* Méthode pour charger les tâches depuis le stockage local (localStorage) lors de l'initialisation du service */
  loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      console.log('No tasks found');
    }
    this.selectedTaskId = this.lastId();
  }

  /* Méthode pour sauvegarder les tâches dans le stockage local (localStorage). */
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

/* En dehors du service, une classe Task est définie. Elle représente une tâche avec des propriétés telles que name,
 * description, priority, status, dueDate et creationDate. Elle a un constructeur pour initialiser les valeurs lors de
 * la création d'une nouvelle tâche */
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
