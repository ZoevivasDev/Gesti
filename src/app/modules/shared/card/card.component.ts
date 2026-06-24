//Contenedor con borde redondeado y sombra suave. Acepta prop narrow para version angosta.
//es una propiedad que le pasa a la card para que tenga un ancho maximo de 620px y quede centrada
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() narrow: boolean = false;
}