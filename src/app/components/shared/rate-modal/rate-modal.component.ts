import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reservation } from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateModalComponent implements OnInit {
  reservation: reservation;
  dateReservation: Date;
  // Rating form
  RatingForm = new FormControl(null, Validators.required);
  private duration = 1500;    //Snack-bar duration in ms

  constructor(public dialogRef: MatDialogRef<RateModalComponent>,
              private _snackBar: MatSnackBar, 
              public reservationService: ReservationService) {
    this.reservation = reservationService.getReservationToCheck();
    this.dateReservation = new Date(this.reservation.date);
  }

  ngOnInit(): void {

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RateSnackBarComponent, {
      duration: this.duration,
    });
  }

  openErrorSnackBar(){
    this._snackBar.openFromComponent(RateSnackBarErrorComponent, {
      duration: this.duration,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onRateClick():void {
    console.log("From " + this.reservation.rating + " to " + this.RatingForm.value );
    this.reservation.rating = this.RatingForm.value;
    this.reservationService.updateReservation(this.reservation).subscribe(
      response => {
        this.dialogRef.close();
        this.openSnackBar();
      },
      error => {
        this.dialogRef.close();
        this.openErrorSnackBar;
        console.log(error);
      }
    );
    
  }

}

@Component({
  selector: 'rate-snack-bar-component',
  templateUrl: 'rate-snack-bar-component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateSnackBarComponent {

}

@Component({
  selector: 'rate-snack-bar-error-component',
  templateUrl: 'rate-snack-bar-error-component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateSnackBarErrorComponent {

}