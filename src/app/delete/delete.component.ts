import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: []
})
export class DeleteComponent {
  task: Task; // Tâche à supprimer
  constructor(private manager: ManagerService, private router: Router) {
    // Récupération de la tâche à supprimer depuis le service
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  // Méthode pour annuler la suppression et revenir aux détails
  cancel() {
    this.router.navigate(['/details']);
  }
  // Méthode pour supprimer la tâche
  delete() {
    // Suppression de la tâche depuis le service
    this.manager.removeTask(this.manager.getSelectedTaskId());
    // Réinitialisation de l'ID de la tâche sélectionnée
    this.manager.setSelectedTaskId(-1);
    // Retour à la liste des tâches
    this.router.navigate(['/']);
  }
}