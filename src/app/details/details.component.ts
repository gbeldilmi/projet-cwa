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
  task: Task;//Déclaration d'une variable task de type Task qui sera utilisée pour stocker les détails d'une tâche
  constructor(private manager: ManagerService, private router: Router) {
    this.task = this.manager.getTask(this.manager.getSelectedTaskId());
  }
  //Navigue vers la route principale  de l'application
  back() {
    this.router.navigate(['/']);
  }
  //Navigue vers la route de modification 
  edit() {
    this.router.navigate(['/edit']);
  }
  //Navigue vers la route de suppression
  delete() {
    this.router.navigate(['/delete']);
  }
  setDone() {//Marque la tâche actuelle comme 'Done' en modifiant son statut, la supprime du service ManagerService avec removeTask, puis réajoute la tâche modifiée avec addTask. Puis navigue vers la route de détails 
    this.task.status = 'Done';
    this.manager.removeTask(this.manager.getSelectedTaskId());
    this.manager.addTask(this.task);
    this.router.navigate(['/details']);
  }
}
