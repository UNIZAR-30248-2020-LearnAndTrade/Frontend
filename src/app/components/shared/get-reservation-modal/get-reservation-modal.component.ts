import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { reservation } from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-get-reservation-modal',
  templateUrl: './get-reservation-modal.component.html',
  styleUrls: ['./get-reservation-modal.component.css']
})
export class GetReservationModalComponent {
  reservation: reservation;
  dateReservation: Date;

  constructor(public dialogRef: MatDialogRef<GetReservationModalComponent>,
              public reservationService: ReservationService) {
    this.reservation = reservationService.getReservationToCheck();
    this.dateReservation = new Date(this.reservation.date);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
