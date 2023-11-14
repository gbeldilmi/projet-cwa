export class CreateComponent {
  // Constructeur avec ManagerService et Router injectés
  constructor(private manager: ManagerService, private router: Router) {
  }

  // Méthode pour annuler la création et revenir à l'accueil
  cancel() {
    this.router.navigate(['/']);
  }

  // Méthode pour soumettre le formulaire
  submit() {
    // Valider le formulaire avant la soumission
    if (this.validate()) {
      // Récupérer les valeurs du formulaire
      let name = (<HTMLInputElement>document.getElementById('name')).value;
      let description = (<HTMLInputElement>document.getElementById('description')).value;
      let priority = (<HTMLInputElement>document.getElementById('priority')).value;
      let dueDate = (<HTMLInputElement>document.getElementById('dueDate')).value;

      // Créer une nouvelle tâche avec les valeurs du formulaire
      let task = new Task(name, description, priority, dueDate);

      // Ajouter la tâche en utilisant le service manager
      this.manager.addTask(task);

      // Revenir à l'accueil
      this.router.navigate(['/']);
    }
  }

  // Méthode pour valider le formulaire
  validate(): boolean {
    let valid: boolean = true;

    // Récupérer la date d'échéance du formulaire
    let dueDate = new Date((<HTMLInputElement>document.getElementById('dueDate')).value);

    // Récupérer la date actuelle
    let creationDate = new Date();

    // Vérifier si la date d'échéance est dans le futur
    if (creationDate > dueDate) {
      valid = false;

      // Afficher une alerte si la date d'échéance n'est pas dans le futur
      alert('La date d\'échéance doit être dans le futur');
    }

    // Retourner la validité du formulaire
    return valid;
  }
}