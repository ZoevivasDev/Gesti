//Define la estructura de una actividad con su nombre y sus turnos.
import { Turno } from './turno.interface';

export interface Actividad {
  _id: string;
  nombre: string;
  turnos: Turno[];
}