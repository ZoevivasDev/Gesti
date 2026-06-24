//Boton reutilizable con dos estilos: accion (celeste) y selector (blanco).

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css', 
})
export class ButtonsComponent {
  // Recibe si el boton tiene el diseño de accion principal (celeste) o selector (blanco)
  @Input() tipo: 'accion' | 'selector' = 'selector';
  
  // Recibe si el boton esta activo/seleccionado actualmente
  @Input() seleccionado: boolean = false;

  // Emite un evento hacia el componente padre cuando el usuario hace click
  @Output() clickBoton = new EventEmitter<void>();

  @Input() disabled: boolean = false

  onBtnClick(): void {
    if (!this.disabled) {
    this.clickBoton.emit();
    }
  }
}