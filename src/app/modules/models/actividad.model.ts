import { Turno } from './turno.model';

export interface Actividad {
  id: number;
  nombre: string;
  emoji: string;
  diasTexto: string;
  turnos: Turno[];
}