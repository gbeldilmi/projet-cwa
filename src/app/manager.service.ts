import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private tasks: Array<Task>; // Tableau pour stocker les tâches
  private selectedTaskId: number; // ID de la tâche sélectionnée

  constructor() {
    this.tasks = new Array<Task>(); // Initialisation du tableau des tâches
    this.selectedTaskId = -1; // Initialisation de l'ID de la tâche sélectionnée
    this.loadTasks(); // Chargement des tâches
  }

  private lastId(): number { // Méthode pour obtenir le dernier ID
    return this.tasks.length - 1;
  }

  setSelectedTaskId(id: number) { // Méthode pour définir l'ID de la tâche sélectionnée
    this.selectedTaskId = id;
  }

  getSelectedTaskId(): number { // Méthode pour obtenir l'ID de la tâche sélectionnée
    return this.selectedTaskId;
  }

  addTask(task?: Task) { // Méthode pour ajouter une tâche
    if (task) {
      this.tasks.push(task); // Ajout de la tâche au tableau
    } else {
      console.log('Aucune tâche à ajouter'); // Message d'erreur si aucune tâche à ajouter
    }
    this.selectedTaskId = this.lastId(); // Mise à jour de l'ID de la tâche sélectionnée
    this.saveTasks(); // Sauvegarde des tâches
  }

  getTasks(): Array<Task> { // Méthode pour obtenir toutes les tâches
    return this.tasks;
  }

  getTask(id: number): Task { // Méthode pour obtenir une tâche spécifique par son ID
    return this.tasks[id];
  }
}