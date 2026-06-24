//Vista mensual de reservas usando FullCalendar con panel lateral de alumnos inscriptos.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


import { ReservaService} from '../../services/reserva.service';
import { ReservaConfirmada } from '../../interfaces/reserva.interface';

import { Subscription } from 'rxjs';

import { CardComponent } from '../../shared/card/card.component';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    CardComponent,
    CustomTableComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  listaTurnos: ReservaConfirmada[] = [];
  private subscripcion!: Subscription;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: 'es',
    height: 'auto',
    expandRows: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: []
  };

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.subscripcion = this.reservaService
      .getReservas$()
      .subscribe((reservas) => {

        this.listaTurnos = reservas;

        const eventosMapeados = reservas.map((res) => ({
          title: `${res.nombre}: ${res.actividad}`,
          date: res.fechaFormateada
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: eventosMapeados
        };
      });
  }

  eliminarTurno(turno: ReservaConfirmada): void {

    if (!turno._id) {
      console.error('La reserva no tiene ID');
      return;
    }

    if (
      confirm(
        `¿Estás segura de que querés cancelar la reserva de ${turno.nombre} ${turno.apellido}?`
      )
    ) {
      this.reservaService.borrarReserva(turno._id).subscribe({
        next: () => {
          console.log('Reserva eliminada correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar reserva:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }
}