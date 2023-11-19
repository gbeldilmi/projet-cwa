import { Component } from '@angular/core';
import { ManagerService, Task } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: []
})

export class ListComponent {
  tasks: Array<[number, Task]>; // Déclare une variable tasks qui est un tableau contenant des tuples composés d'un
                                // numéro qui est l'indice de la tâche et d'une tâche 
  allTasks: Array<[number, Task]>; // Déclare une variable allTasks de même type que tasks pour stocker toutes les
                                   // tâches


  /* Dans le constructeur, il récupère toutes les tâches à partir du ManagerService et les stocke dans allTasks, puis
   * initialise tasks avec les mêmes données. */
  constructor(private manager: ManagerService, private router: Router) {
    let t = this.manager.getTasks();
    this.allTasks = new Array<[number, Task]>();
    for (let i = 0; i < t.length; i++) {
      this.allTasks.push([i, t[i]]);
    }
    this.tasks = this.allTasks;
  }

  /* Méthode details appelée lorsqu'on souhaite afficher les détails d'une tâche spécifique, elle utilise
   * manager.setSelectedTaskId(task_id) pour définir l'ID de la tâche sélectionnée dans le service ManagerService et
   * navigue dans les details */
  details(task_id: number) {
    console.log(task_id);
    this.manager.setSelectedTaskId(task_id);
    this.router.navigate(['/details']);
  }

  /* mehtode create qui permet de naviguer a la page de creation */
  create() {
    this.router.navigate(['/create']);
  }

  /* Méthode sort() appelée lorsqu'une action de tri est déclenchée. Elle récupère les critères de tri à partir des
   * éléments du formulaire HTML (status, priority, attr, order) et applique le tri aux tâches en utilisant ces
   * critères. Elle utilise les méthodes de Array telles que filter et sort pour effectuer le tri en fonction du statut,
   * de la priorité et d'autres attributs de la tâche */
  sort() {
    let t = new Array<[number, Task]>(); // crée un tableau t qui stocke des tuples de type [number, Task]
    this.allTasks.forEach(val => t.push(Object.assign({}, val))); // copie toutes les tâches de this.allTasks dans le
                                                                  // tableau t en utilisant Object.assign() pour éviter
                                                                  // les références aux objets d'origine et obtenir une
                                                                  // copie indépendante de chaque tâche
    // Récupére les valeurs des champs HTML pour les critères de tri (status, priority, attr, order)
    let s = (<HTMLInputElement>document.getElementById('status')).value;
    if (s != 'All') { // Filtre sur la valeur de 'status' si différent de 'All'
      t = t.filter(x => x[1].status == s);
    }
    let p = (<HTMLInputElement>document.getElementById('priority')).value;
    if (p != 'All') { // filtre sur la valeur de 'priority' si différent de 'All'
      t = t.filter(x => x[1].priority == p);
    }
    let a = (<HTMLInputElement>document.getElementById('attr')).value as keyof Task;
    let o = (<HTMLInputElement>document.getElementById('order')).value == 'asc' ? -1 : 1;
    if (a == 'priority') o = -o;
    t.sort((x, y) => { // Utilise une fonction de comparaison pour trier les tâches 
      if (x[1][a] < y[1][a]) return o;
      return -o;
    });
    this.tasks = t; // met à jour this.tasks avec le résultat du tri effectué sur le tableau t
  }
}
