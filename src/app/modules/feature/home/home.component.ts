import { Component } from '@angular/core';
//importmamos navbar para mostrarlo en el home
import { NavbarComponent } from '../../shared/navbar/navbar.component';
// importo registro-reserva
import {RegistroReservaComponent} from '../registro-reserva/registro-reserva.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RegistroReservaComponent

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}
