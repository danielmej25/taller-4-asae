import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Estudiantes',
        icon: 'pi pi-user-plus',
        routerLink: 'add-student',
      },
      {
        label: 'Lista estudiantes',
        icon: 'pi pi-id-card',
        routerLink: 'list-student',
      },
    ];

    this.activeItem = this.items[2];
  }
}
