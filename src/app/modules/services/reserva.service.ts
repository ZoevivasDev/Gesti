//Comunicacion con el backend para gestionar reservas. Maneja el estado reactivo con BehaviorSubject.
//Es una forma de mantener la lista de reservas actualizada en tiempo real en toda la app sin tener que volver a consultar el backend cada vez.

//Cuando agregas o borras una reserva, el BehaviorSubject avisa automaticamente a todos los componentes que esten escuchando (calendar, historial) y se actualizan solos.


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ReservaConfirmada } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // URL base del endpoint de reservas tomada del environment
  private readonly baseUrl = `${environment.apiUrl}/reservas`;
  
  // Estado central de reservas — emite la lista actualizada a todos los componentes que escuchan
  private reservasSubject = new BehaviorSubject<ReservaConfirmada[]>([]);

  constructor(private http: HttpClient) {
    // Al iniciar el servicio, trae las reservas existentes de la base de datos
    this.refreshReservas();
  }

  // Expone el estado de reservas como Observable para que los componentes puedan suscribirse
  getReservas$(): Observable<ReservaConfirmada[]> {
    return this.reservasSubject.asObservable();
  }

  // Consulta el backend y actualiza el estado interno con las reservas actuales
  private refreshReservas(): void {
    this.http.get<ReservaConfirmada[]>(this.baseUrl).subscribe({
      next: (data) => this.reservasSubject.next(data),
      error: (err) => console.error('Error al sincronizar reservas:', err)
    });
  }

  // Envía una nueva reserva al backend y la agrega al estado sin recargar todo
  guardarReserva(reserva: ReservaConfirmada): Observable<any> {
    return this.http.post<any>(this.baseUrl, reserva).pipe(
      tap((res) => {
        const nueva = res.data || res;
        // Agrega la nueva reserva a la lista existente y notifica a los suscriptores
        this.reservasSubject.next([...this.reservasSubject.value, nueva]);
      })
    );
  }
  // Elimina una reserva del backend y la quita del estado por su ID
  borrarReserva(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const actualizadas = this.reservasSubject.value.filter(r => r._id !== id);
        this.reservasSubject.next(actualizadas);
      })
    );
  }
}

//Suscribirse: le llegan las actualizaciones automaticas.