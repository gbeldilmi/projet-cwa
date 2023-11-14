templateUrl: './list.component.html',
styleUrls: ['./list.component.scss'],
providers: []
})
export class ListComponent {
tasks: Array<[number, Task]>; // Tableau pour stocker les tâches
allTasks: Array<[number, Task]>; // Tableau pour stocker toutes les tâches
constructor(private manager: ManagerService, private router: Router) {
  let t = this.manager.getTasks(); // Récupération des tâches depuis le service
  this.allTasks = new Array<[number, Task]>(); // Initialisation du tableau de toutes les tâches
  for (let i = 0; i < t.length; i++) {
    this.allTasks.push([i, t[i]]); // Ajout des tâches au tableau
  }
  this.tasks = this.allTasks; // Initialisation du tableau des tâches
}
details(task_id: number) { // Méthode pour afficher les détails d'une tâche
  console.log(task_id); // Affichage de l'ID de la tâche
  this.manager.setSelectedTaskId(task_id); // Définition de l'ID de la tâche sélectionnée
  this.router.navigate(['/details']); // Navigation vers les détails de la tâche
}
create() { // Méthode pour créer une tâche
  this.router.navigate(['/create']); // Navigation vers la création de tâche
}
sort() { // Méthode pour trier les tâches
  let t = new Array<[number, Task]>(); // Tableau pour stocker les tâches triées
  this.allTasks.forEach(val => t.push(Object.assign({}, val))); // Copie des tâches dans le tableau
  let s = (<HTMLInputElement>document.getElementById('status')).value; // Récupération du statut pour le tri
  if (s != 'All') {
    t = t.filter(x => x[1].status == s); // Filtrage des tâches par statut
  }
  let p = (<HTMLInputElement>document.getElementById('priority')).value; // Récupération de la priorité pour le tri
  if (p != 'All') {
    t = t.filter(x => x[1].priority == p); // Filtrage des tâches par priorité
  }
  let a = (<HTMLInputElement>document.getElementById('attr')).value as keyof Task; // Récupération de l'attribut pour le tri
  let o = (<HTMLInputElement>document.getElementById('order')).value == 'asc' ? -1 : 1; // Récupération de l'ordre pour le tri
  if (a == 'priority') o = -o; // Inversion de l'ordre si l'attribut est la priorité