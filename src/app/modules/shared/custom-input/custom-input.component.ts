//input con label integrado y validación reactiva.
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  @Input() inputId: string = '';
  @Input() labelText: string = '';
  @Input() inputType: string = 'text';
  @Input() placeholderText: string = '';
  @Input() control!: FormControl; 
}