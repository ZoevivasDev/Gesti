//Panel administrativo para crear, editar y eliminar actividades y turnos.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { CustomInputComponent } from '../../shared/custom-input/custom-input.component';
import { ReservaService } from '../../services/reserva.service'; 
import { ActividadService } from '../../services/actividad.service';

import { ButtonsComponent}from '../../shared/buttons/buttons.component'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, CustomInputComponent,ButtonsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  adminForm!: FormGroup;
  actividades: any[] = [];
  turnoEnEdicion: any = null; 
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private actividadService: ActividadService, 
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      horario: ['', Validators.required],
      profesor: ['', Validators.required],
      limiteAlumnos: [10, [Validators.required, Validators.min(1)]]
    });
     this.cargarActividades();

    this.editForm = this.fb.group({
    horario: ['', Validators.required],
    profesor: ['', Validators.required],
    limiteAlumnos: [10, [Validators.required, Validators.min(1)]]
}); 
  }

  // para guardar todo
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

      this.actividadService.guardarActividadConTurno(payload).subscribe({
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


//agrego una parte pa borrar
  cargarActividades(): void {
    this.actividadService.getActividades().subscribe({
      next: (data) => this.actividades = data,
      error: (err) => console.error(err)
    });
  }

  borrarActividad(id: string): void {
    if (confirm('¿Eliminar esta actividad y todos sus turnos?')) {
      this.actividadService.borrarActividad(id).subscribe({
        next: () => this.cargarActividades(),
        error: (err) => console.error(err)
      });
    }
  }

  // Abre el formulario de edicion con los datos del turno seleccionado
editarTurno(turno: any): void {
  this.turnoEnEdicion = turno;
  this.editForm.setValue({
    horario: turno.horario,
    profesor: turno.profesor,
    limiteAlumnos: turno.limiteAlumnos
  });
}

// Guarda los cambios del turno editado
guardarEdicion(turnoId: string): void {
  if (this.editForm.valid) {
    this.actividadService.editarTurno(turnoId, this.editForm.value).subscribe({
      next: () => {
        alert('Turno actualizado con éxito');
        this.turnoEnEdicion = null;
        this.cargarActividades();
      },
      error: (err) => console.error(err)
    });
  }
}

// Cancela la edición
cancelarEdicion(): void {
  this.turnoEnEdicion = null;
}

}