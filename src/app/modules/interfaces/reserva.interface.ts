//Define la estructura de una reserva confirmada con los datos del alumno.
export interface ReservaConfirmada {
  _id?: string;
  nombre: string;
  apellido: string;
  actividad: string;
  turnoTexto: string;
  fechaFormateada: string;
}