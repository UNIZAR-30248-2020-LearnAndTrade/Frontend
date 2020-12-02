import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { reservation } from "../../../models/reservation";

@Component({
  selector: 'app-get-reservation-modal',
  templateUrl: './get-reservation-modal.component.html',
  styleUrls: ['./get-reservation-modal.component.css']
})
export class GetReservationModalComponent {
  reservationTeach: reservation;
  reservationLearn: reservation;

  constructor(public dialogRef: MatDialogRef<GetReservationModalComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
