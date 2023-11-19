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
  task: Task; // Déclare une variable task de type Task pour stocker les détails de la tâche à supprimer

  /* Le constructeur de la classe reçoit deux injections de dépendances : manager de type ManagerService et router de
   * type Router. Ces injections permettent d accéder aux fonctionnalités du ManagerService et de Router dans la classe.
   * Dans le constructeur, lors de la création de l'instance du composant DeleteComponent, il récupère la tâche à
   * supprimer à l'aide de manager.getTask(manager.getSelectedTaskId()). Il utilise manager.getSelectedTaskId() pour
   * obtenir l'ID de la tâche sélectionnée. */
  constructor(private manager: ManagerService, private router: Router) {
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }

  /* Méthode cancel() appelée lorsqu'on souhaite annuler la suppression de la tâche et nous renvoie vers le detail de
   * celle ci */
  cancel() {
    this.router.navigate(['/details']);
  }

  /* Méthode delete() appelée lorsqu'on confirme la suppression de la tâche. Elle utilise
   * manager.removeTask(manager.getSelectedTaskId()) pour supprimer la tâche sélectionnée en utilisant son ID. Ensuite,
   * elle utilise manager.setSelectedTaskId(-1) pour le reinitialiser. Enfin, elle utilise this.router.navigate(['/']);
   * pour naviguer vers la route principale de l'application après la suppression. */
  delete() {
    this.manager.removeTask(this.manager.getSelectedTaskId());
    this.manager.setSelectedTaskId(-1);
    this.router.navigate(['/']);
  }
}
