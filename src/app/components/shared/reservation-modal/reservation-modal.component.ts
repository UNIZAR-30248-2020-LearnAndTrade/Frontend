import {Component} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { reservation } from "../../../models/reservation";

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent{
  public selectedInterest;
  public selectedKnowledge;
  reservation: reservation;

  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
