import {Component} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent{
  public selectedInterest;
  public selectedKnowledge;

  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
