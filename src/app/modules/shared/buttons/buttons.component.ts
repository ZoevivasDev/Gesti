import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css', // Tu CSS específico de botones va acá
})
export class ButtonsComponent {
  // Recibe si el botón tiene el diseño de acción principal (celeste) o selector (blanco)
  @Input() tipo: 'accion' | 'selector' = 'selector';
  
  // Recibe si el botón está activo/seleccionado actualmente
  @Input() seleccionado: boolean = false;

  // Emite un evento hacia el componente padre cuando el usuario hace click
  @Output() clickBoton = new EventEmitter<void>();

  onBtnClick(): void {
    this.clickBoton.emit();
  }
}