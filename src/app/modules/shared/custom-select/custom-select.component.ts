import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-select.component.html', 
  styleUrls: ['./custom-select.component.css']    
})
export class CustomSelectComponent {
  @Input() labelText: string = '';
  @Input() placeholderText: string = 'Seleccioná una opción';
  @Input() options: any[] = []; 
  @Input() displayKey: string = ''; 
  @Input() control!: FormControl;
}