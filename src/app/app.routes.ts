import { Routes } from '@angular/router';
import { HomeComponent } from './modules/feature/home/home.component';
import { CalendarComponent } from './modules/feature/calendar/calendar.component';


export const routes: Routes = [
//Primero dejo el path vacio 
    {path:'',loadComponent:()=> import('./modules/feature/home/home.component').then(m => m.HomeComponent)},

//hacemos otro path para el calendario 
    {path:'calendar',loadComponent:()=> import('./modules/feature/calendar/calendar.component').then(m => m.CalendarComponent)}
    



];
