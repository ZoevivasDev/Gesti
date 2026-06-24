//Comunicacion con el backend para obtener, crear, editar y eliminar actividades y turnos.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Actividad } from '../interfaces/actividad.interface';
import { Turno } from '../interfaces/turno.interface';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private readonly baseUrl = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.baseUrl);
  }

  guardarActividadConTurno(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  borrarActividad(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  editarTurno(id: string, datos: Partial<Turno>): Observable<any> {
  return this.http.put(`${environment.apiUrl}/turnos/${id}`, datos);
}

}