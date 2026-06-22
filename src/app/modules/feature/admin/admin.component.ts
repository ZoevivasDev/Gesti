import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { CustomInputComponent } from '../../shared/custom-input/custom-input.component';
import { ReservaService } from '../../services/reserva.services'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, CustomInputComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  // Ahora solo tenemos un formulario maestro
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService 
  ) {}

  ngOnInit(): void {
    // Definimos el formulario unificado
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      horario: ['', Validators.required],
      profesor: ['', Validators.required],
      limiteAlumnos: [10, [Validators.required, Validators.min(1)]]
    });
  }

  // Método único para guardar todo
  guardarTodo() {
    if (this.adminForm.valid) {
      const data = this.adminForm.value;
      
      const payload = {
        nombre: data.nombre,
        turno: { 
          horario: data.horario,
          profesor: data.profesor,
          limiteAlumnos: data.limiteAlumnos
        }
      };

      this.reservaService.guardarActividadConTurno(payload).subscribe({
        next: () => {
          alert('¡Actividad y turno creados con éxito!');
          this.adminForm.reset({ limiteAlumnos: 10 });
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Hubo un problema al guardar la configuración.');
        }
      });
    } else {
      alert('Por favor, completá todos los campos correctamente.');
    }
  }
}