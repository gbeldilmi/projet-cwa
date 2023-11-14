/**
 * Service de gestion des tâches.
 */
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  /**
   * Liste des tâches.
   */
  private tasks: Array<Task>;
  /**
   * Identifiant de la tâche sélectionnée.
   */
  private selectedTaskId: number;
  /**
   * Constructeur de la classe ManagerService.
   * Initialise la liste des tâches et l'identifiant de la tâche sélectionnée.
   */
  constructor() {
    this.tasks = new Array<Task>();
    this.selectedTaskId = -1;
    this.loadTasks();
  }
  /**
   * Retourne l'identifiant de la tâche sélectionnée.
   * @returns Identifiant de la tâche sélectionnée.
   */
  getSelectedTaskId(): number {
    return this.selectedTaskId;
  }
  /**
   * Définit l'identifiant de la tâche sélectionnée.
   * @param id Identifiant de la tâche sélectionnée.
   */
  setSelectedTaskId(id: number) {
    this.selectedTaskId = id;
  }
  /**
   * Ajoute une tâche à la liste des tâches.
   * @param task Tâche à ajouter.
   */
  addTask(task?: Task) {
    if (task) {
      this.tasks.push(task);
    } else {
      console.log('No task to add');
    }
    this.selectedTaskId = this.lastId();
    this.saveTasks();
  }
  /**
   * Retourne la liste des tâches.
   * @returns Liste des tâches.
   */
  getTasks(): Array<Task> {
    return this.tasks;
  }
  /**
   * Retourne une tâche à partir de son identifiant.
   * @param id Identifiant de la tâche.
   * @returns Tâche correspondante à l'identifiant.
   */
  getTask(id: number): Task {
    return this.tasks[id];
  }
  /**
   * Supprime une tâche à partir de son identifiant.
   * @param id Identifiant de la tâche à supprimer.
   */
  removeTask(id: number) {
    this.tasks.splice(id, 1);
    this.selectedTaskId = this.lastId();
    this.saveTasks();
  }
  /**
   * Charge la liste des tâches depuis le stockage local.
   */
  loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      console.log('No tasks found');
    }
    this.selectedTaskId = this.lastId();
  }
  /**
   * Sauvegarde la liste des tâches dans le stockage local.
   */
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  /**
   * Retourne l'identifiant de la dernière tâche de la liste.
   * @returns Identifiant de la dernière tâche de la liste.
   */
  private lastId(): number {
    return this.tasks.length - 1;
  }
}

/**
 * Représente une tâche.
 */
export class Task {
  /**
   * Nom de la tâche.
   */
  public name: string;
  /**
   * Description de la tâche.
   */
  public description: string;
  /**
   * Priorité de la tâche.
   */
  public priority: string;
  /**
   * Statut de la tâche.
   */
  public status: string;
  /**
   * Date d'échéance de la tâche.
   */
  public dueDate: string;
  /**
   * Date de création de la tâche.
   */
  public creationDate: string;
  /**
   * Constructeur de la classe Task.
   * Initialise les propriétés de la tâche.
   * @param name Nom de la tâche.
   * @param description Description de la tâche.
   * @param priority Priorité de la tâche.
   * @param dueDate Date d'échéance de la tâche.
   */
  constructor(name: string, description: string, priority: string, dueDate: string) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = 'Ongoing';
    this.dueDate = dueDate;
    this.creationDate = new Date().toLocaleDateString('sv');
  }
}