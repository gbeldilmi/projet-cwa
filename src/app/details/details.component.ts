import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: []
})
export class DetailsComponent {
  task: Task; // Tâche à afficher
  constructor(private manager: ManagerService, private router: Router) {
    // Récupération de la tâche à afficher depuis le service
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  // Méthode pour revenir à la liste des tâches
  back() {
    this.router.navigate(['/']);
  }
  // Méthode pour aller à l'édition de la tâche
  edit() {
    this.router.navigate(['/edit']);
  }
  // Méthode pour aller à la suppression de la tâche
  delete() {
    this.router.navigate(['/delete']);
  }
  // Méthode pour marquer la tâche comme terminée
  setDone() {
    this.task.status = 'Done'; // Changement du statut de la tâche
    this.manager.removeTask(this.manager.getSelectedTaskId()); // Suppression de l'ancienne tâche
    this.manager.addTask(this.task); // Ajout de la tâche modifiée
    this.router.navigate(['/details']); // Retour aux détails de la tâche
  }
}