//Tabla con headers dinamicos y proyeccion de contenido para las filas.
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = []; 
}