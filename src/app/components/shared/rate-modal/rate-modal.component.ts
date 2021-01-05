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
  // Username class
  // Date of lesson
  // Rating form
  RatingForm = new FormControl(null, Validators.required);
  duration = 1500;    //Snack-bar duration in ms

  constructor(public dialogRef: MatDialogRef<RateModalComponent>,
              public reservationService: ReservationService,
              private _snackBar: MatSnackBar) {

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
    //console.log(this.RatingForm.value);
    this.dialogRef.close();
    //this.openSnackBar();
    this.openErrorSnackBar();
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