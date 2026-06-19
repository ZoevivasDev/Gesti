import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//importi  el calendario
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule, 
    FullCalendarModule //agregamos en los imports
  ], 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  
  //Configuro las opciones del calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',//Vista mensual
    plugins: [dayGridPlugin],//Agrego el plugin para la vista de cuadrícula diaria
    locale: 'es', // Para que los días y meses salgan en español
    
    height: '100%', 
    expandRows: true,
    
    events: [
      { title: 'evento 1', date: '2026-06-15' },
      { title: 'Turno Limpieza', date: '2026-06-18' }
    ]//Aquí puedes agregar más eventos según tus necesidades
  };
}