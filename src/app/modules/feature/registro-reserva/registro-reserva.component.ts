import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ButtonsComponent } from '../../shared/buttons/buttons.component';
import { ReservaService, ReservaConfirmada } from '../../services/reserva.services';
import { CardComponent } from '../../shared/card/card.component';
import { CustomInputComponent } from '../../shared/custom-input/custom-input.component';

@Component({
  selector: 'app-registro-reserva',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsComponent,
    CardComponent,
    CustomInputComponent
  ],
  templateUrl: './registro-reserva.component.html',
  styleUrl: './registro-reserva.component.css',
})
export class RegistroReservaComponent implements OnInit {

  actividades: any[] = [];
  turnosDisponibles: any[] = [];

  reservaForm: FormGroup;
  reservaConfirmada: ReservaConfirmada | null = null;

  pasoActual: number = 1;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService
  ) {
    this.reservaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      actividadId: ['', Validators.required],
      turnoId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reservaService.getActividades().subscribe({
      next: (data) => {
        this.actividades = data;
      },
      error: (err) =>
        console.error(
          'Error al traer actividades para el cliente:',
          err
        )
    });
  }

  onActividadChange(): void {
    const actividadId = this.reservaForm.get('actividadId')?.value;

    const actividad = this.actividades.find(
      (a) => a._id === actividadId
    );

    this.turnosDisponibles = actividad?.turnos ?? [];

    this.reservaForm.get('turnoId')?.setValue('');

    if (
      actividad &&
      this.reservaForm.get('nombre')?.valid &&
      this.reservaForm.get('apellido')?.valid
    ) {
      this.pasoActual = 2;
    }
  }

  volverPasoUno(): void {
    this.pasoActual = 1;
  }

  onSubmit(): void {

    if (this.reservaForm.invalid) {
      return;
    }

    const valores = this.reservaForm.value;

    const actividad = this.actividades.find(
      (a) => a._id === valores.actividadId
    );

    const turno = this.turnosDisponibles.find(
      (t) => t._id === valores.turnoId
    );

    const datosParaGuardar: ReservaConfirmada = {
      nombre: valores.nombre,
      apellido: valores.apellido,
      actividad: actividad?.nombre ?? '',
      turnoTexto: turno
        ? `${turno.horario} (Prof: ${turno.profesor})`
        : '',
      fechaFormateada: new Date().toISOString().split('T')[0]
    };

    this.reservaService.guardarReserva(datosParaGuardar).subscribe({
      next: (respuesta) => {
        this.reservaConfirmada = respuesta.data || respuesta;
        this.pasoActual = 3;
      },
      error: (err) => {
        console.error(
          'Error al procesar la reserva en el Back:',
          err
        );
        alert(
          'Hubo un problema al conectar con el servidor.'
        );
      }
    });
  }

  hacerOtraReserva(): void {
    this.reservaConfirmada = null;
    this.reservaForm.reset();
    this.turnosDisponibles = [];
    this.pasoActual = 1;
  }
}