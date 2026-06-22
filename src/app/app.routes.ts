import { Routes } from '@angular/router';

export const routes: Routes = [
  // Path vacío redirige al Home (Carga perezosa / Lazy Loading)
  {
    path: '',
    loadComponent: () => import('./modules/feature/home/home.component').then(m => m.HomeComponent)
  },

  // Path para el Calendario
  {
    path: 'calendar',
    loadComponent: () => import('./modules/feature/calendar/calendar.component').then(m => m.CalendarComponent)
  },

  // Path para el Registro de Reserva
  {
    path: 'registro-reserva',
    loadComponent: () => import('./modules/feature/registro-reserva/registro-reserva.component').then(m => m.RegistroReservaComponent)
  },

  // path para el historial
  {
    path: 'historial-reservas',
    loadComponent: () => import('./modules/feature/historial-reservas/historial-reservas.component').then(m => m.HistorialReservasComponent)
  },

  {
    path: 'admin',
    loadComponent: () => import('./modules/feature/admin/admin.component').then(m => m.AdminComponent)
  }

  

];