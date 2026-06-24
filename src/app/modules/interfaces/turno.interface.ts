//Define la estructura de un turno con horario, profesor y límite de alumnos.
export interface Turno {
  _id: string;
  actividadId: string;
  horario: string;
  profesor: string;
  limiteAlumnos: number;
}