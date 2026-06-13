import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//importamos el routermodule para los enlaces de navegación
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {


}
