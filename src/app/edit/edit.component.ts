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
  task: Task; // Tâche à éditer
  constructor(private manager: ManagerService, private router: Router) {
    // Récupération de la tâche à éditer depuis le service
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  // Méthode pour annuler l'édition et revenir aux détails
  cancel() {
    this.router.navigate(['/details']);
  }
  // Méthode pour soumettre les modifications
  submit() {
    // Validation avant soumission
    if (this.validate()) {
      // Récupération des valeurs modifiées
      this.task.name = (<HTMLInputElement>document.getElementById('name')).value;
      this.task.description = (<HTMLInputElement>document.getElementById('description')).value;
      this.task.priority = (<HTMLInputElement>document.getElementById('priority')).value;
      this.task.status = (<HTMLInputElement>document.getElementById('status')).value;
      this.task.dueDate = (<HTMLInputElement>document.getElementById('dueDate')).value;
      // Suppression de l'ancienne tâche
      this.manager.removeTask(this.manager.getSelectedTaskId());
      // Ajout de la tâche modifiée
      this.manager.addTask(this.task);
      // Retour aux détails
      this.router.navigate(['/details']);
    }
  }
  // Méthode de validation
  validate(): boolean {
    let valid: boolean = true;
    // Récupération de la date d'échéance
    let dueDate = new Date((<HTMLInputElement>document.getElementById('dueDate')).value);
    // Récupération de la date de création
    let creationDate = new Date(this.task.creationDate);
    // Vérification que la date d'échéance est après la date de création
    if (creationDate > dueDate) {
      valid = false;
      alert('La date d\'échéance doit être après la date de création');
    }
    return valid;
  }
}