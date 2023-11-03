import { Component } from '@angular/core';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'GesTaches';
  private manager: ManagerService;
  constructor() {
    console.log('AppComponent constructor');
    this.manager = new ManagerService();
  }
  getManager(): ManagerService {
    console.log('AppComponent getManager');
    return this.manager;
  }
}
