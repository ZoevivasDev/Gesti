//Listado completo de reservas con opción de cancelación.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService} from '../../services/reserva.service';
import { ReservaConfirmada } from '../../interfaces/reserva.interface';

import { Subscription } from 'rxjs';

import { CustomTableComponent } from '../../shared/custom-table/custom-table.component'; 
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-historial-reservas',
  standalone: true,
  imports: [CommonModule, CustomTableComponent, CardComponent],
  templateUrl: './historial-reservas.component.html',
  styleUrl: './historial-reservas.component.css'
})
export class HistorialReservasComponent implements OnInit, OnDestroy {

  listaReservas: ReservaConfirmada[] = [];
  private sub: Subscription = new Subscription();

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.sub = this.reservaService.getReservas$().subscribe({
      next: (data) => {
        this.listaReservas = data;
      },
      error: (err) => {
        console.error('Error al cargar el historial:', err);
      }
    });
  }

  cancelarTurno(reserva: ReservaConfirmada): void {

    if (!reserva._id) {
      console.error('La reserva no tiene ID');
      return;
    }

    if (
      confirm(
        `¿Estás segura de que querés cancelar el turno de ${reserva.nombre} ${reserva.apellido}?`
      )
    ) {
      this.reservaService.borrarReserva(reserva._id).subscribe({
        next: () => {
          console.log('Reserva eliminada correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar reserva:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}