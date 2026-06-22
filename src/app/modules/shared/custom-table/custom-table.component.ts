import { Component, Input } from '@angular/core'; // 👈 Asegurate de importar 'Input'
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