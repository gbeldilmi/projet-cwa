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
  task: Task; // Déclaration d'une variable task de type Task qui sera utilisée pour stocker les détails de la tâche
              // courante à éditer

  constructor(private manager: ManagerService, private router: Router) {
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }

  /* Navigue vers la route des détails annulant les modifications en cours */
  cancel() {
    this.router.navigate(['/details']);
  }

  /* methode submit() qui vérifie si les données sont valides en utilisant la méthode validate(). Si oui,elle met à jour
   * les propriétés de la tâche avec les valeurs des champs HTML correspondants, supprime la tâche originale du service
   * ManagerService avec removeTask, ajoute la tâche modifiée avec addTask, puis navigue vers la route des détails */
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

  /* vérifie si la duedate de la tâche est postérieure à la date de création. Si la duedate est antérieure à la date de
   * création, elle affiche une alerte et retourne false, sinon retourne true */
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
