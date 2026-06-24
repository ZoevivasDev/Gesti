//Pagina de bienvenida con descripcion de la app y sus funcionalidades.
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
