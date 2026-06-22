import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ReservaConfirmada {
  _id?: string;
  nombre: string;
  apellido: string;
  actividad: string;
  turnoTexto: string;
  fechaFormateada: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoints = {
    reservas: `${this.baseUrl}/reservas`,
    actividades: `${this.baseUrl}/actividades`
  };

  private reservasSubject = new BehaviorSubject<ReservaConfirmada[]>([]);

  constructor(private http: HttpClient) {
    this.refreshReservas();
  }

  // ==========================================
  // 🎭 ACTIVIDADES Y CONFIGURACIÓN
  // ==========================================
  getActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoints.actividades);
  }

  // Este es el método que soluciona tu flujo unificado
  guardarActividadConTurno(payload: any): Observable<any> {
    return this.http.post<any>(this.endpoints.actividades, payload);
  }

  // ==========================================
  // 📅 RESERVAS (Manejo Reactivo)
  // ==========================================
  getReservas$(): Observable<ReservaConfirmada[]> {
    return this.reservasSubject.asObservable();
  }

  private refreshReservas(): void {
    this.http.get<ReservaConfirmada[]>(this.endpoints.reservas).subscribe({
      next: (data) => this.reservasSubject.next(data),
      error: (err) => console.error('Error al sincronizar reservas:', err)
    });
  }

  guardarReserva(reserva: ReservaConfirmada): Observable<any> {
    return this.http.post<any>(this.endpoints.reservas, reserva).pipe(
      tap((res) => {
        const nueva = res.data || res;
        this.reservasSubject.next([...this.reservasSubject.value, nueva]);
      })
    );
  }

  borrarReserva(id: string): Observable<any> {
    return this.http.delete(`${this.endpoints.reservas}/${id}`).pipe(
      tap(() => {
        const actualizadas = this.reservasSubject.value.filter(r => r._id !== id);
        this.reservasSubject.next(actualizadas);
      })
    );
  }
}