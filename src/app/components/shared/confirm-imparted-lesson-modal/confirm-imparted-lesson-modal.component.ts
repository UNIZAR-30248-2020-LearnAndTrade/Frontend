import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reservation } from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-confirm-imparted-lesson-modal',
  templateUrl: './confirm-imparted-lesson-modal.component.html',
  styleUrls: ['./confirm-imparted-lesson-modal.component.css']
})
export class ConfirmImpartedLessonModalComponent implements OnInit {
  reservation: reservation;
  dateReservation: Date;
  private duration = 1500;    //Snack-bar duration in ms

  constructor(public dialogRef: MatDialogRef<ConfirmImpartedLessonModalComponent>,
              private _snackBar: MatSnackBar, 
              public reservationService: ReservationService) {
    this.reservation = reservationService.getReservationToCheck();
    this.dateReservation = new Date(this.reservation.date);
  }

  ngOnInit(): void {

  }

  openSnackBar() {
    this._snackBar.openFromComponent(ConfirmImpartedLessonSnackBarComponent, {
      duration: this.duration,
    });
  }

  openErrorSnackBar(){
    this._snackBar.openFromComponent(ConfirmImpartedLessonSnackBarErrorComponent, {
      duration: this.duration,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick():void {
    console.log("Lección impartida");
    let username = JSON.parse(localStorage.getItem('userJSON')).username;
    if (username == this.reservation.studentUsername) {
      this.reservation.studentFinished = true;
    }
    else {
      this.reservation.teacherFinished = true;
    }
    this.reservationService.updateReservation(this.reservation).subscribe(
      response => {
        this.dialogRef.close();
        this.openSnackBar();
        console.log(response);
      },
      error => {
        this.dialogRef.close();
        this.openErrorSnackBar();
        console.log(error);
      }
    );
    
  }

  onNegateClick():void {
    console.log("Lección no impartida");
    this.reservation.rating = -2;
    this.reservationService.updateReservation(this.reservation).subscribe(
      response => {
        this.dialogRef.close();
        this.openSnackBar();
        console.log(response);
      },
      error => {
        this.dialogRef.close();
        this.openErrorSnackBar();
        console.log(error);
      }
    );
  }

}

@Component({
  selector: 'confirm-imparted-lesson-snack-bar-component',
  templateUrl: 'confirm-imparted-lesson-snack-bar.component.html',
  styleUrls: ['./confirm-imparted-lesson-modal.component.css']
})
export class ConfirmImpartedLessonSnackBarComponent {

}

@Component({
  selector: 'confirm-imparted-lesson-snack-bar-error-component',
  templateUrl: 'confirm-imparted-lesson-snack-bar-error.component.html',
  styleUrls: ['./confirm-imparted-lesson-modal.component.css']
})
export class ConfirmImpartedLessonSnackBarErrorComponent {

}
