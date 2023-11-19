import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: []
})

export class CreateComponent {
  /* Le constructeur reçoit deux injections de dépendances: manager de type ManagerService et router de type Router.
   * Ces injections permettent d accéder aux fonctionnalités du ManagerService et de Router dans la classe. */
  constructor(private manager: ManagerService, private router: Router) {
  }

  /* Méthode cancel() appelée lorsqu'on souhaite annuler la création de la tâche */
  cancel() {
    this.router.navigate(['/']); // pour naviguer vers la route principale de l'application.
  }
  
  /* Méthode submit() appelée lorsqu'une nouvelle tâche est soumise */
  submit() {
    if (this.validate()) { //vérifie la validité des données via la méthode validate()
      // Si la validation réussit, elle récupère les valeurs des champs de formulaire (name, description, priority,
      // dueDate) pour créer une nouvelle instance de Task en utilisant ces valeurs
      let name = (<HTMLInputElement>document.getElementById('name')).value;
      let description = (<HTMLInputElement>document.getElementById('description')).value;
      let priority = (<HTMLInputElement>document.getElementById('priority')).value;
      let dueDate = (<HTMLInputElement>document.getElementById('dueDate')).value;
      let task = new Task(name, description, priority, dueDate);
      this.manager.addTask(task);
      // elle utilise le service ManagerService pour ajouter cette tâche, puis navigue vers la route principale de
      // l'application
      this.router.navigate(['/']);
    }
  }
  
  /* Méthode validate() pour valider les données de la tâche avant de la créer. Elle vérifie si la date d'échéance
   * (dueDate) est ultérieure à la date de création (creationDate). Si la date d'échéance est antérieure à la date de
   * création, elle retourne false et affiche une alerte indiquant que la date d'échéance doit être dans le futur */
  validate(): boolean {
    let valid: boolean = true;
    let dueDate = new Date((<HTMLInputElement>document.getElementById('dueDate')).value);
    let creationDate = new Date();
    if (creationDate > dueDate) {
      valid = false;
      alert('Due date must be in the future');
    }
    return valid;
  }
}
