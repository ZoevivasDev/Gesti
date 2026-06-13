import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//importamos el calendario
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule, 
    FullCalendarModule //agregamos en los imports del componente
  ], 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  
  //Configuro las opciones del calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: 'es', // Para que los días y meses salgan en español
    events: [
      { title: 'Turno Control', date: '2026-06-15' },
      { title: 'Turno Limpieza', date: '2026-06-18' }
    ]
  };
}