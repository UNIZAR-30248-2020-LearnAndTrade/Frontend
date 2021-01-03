import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { reservation } from "../../../models/reservation";
import {theme} from "../../../models/theme";
import {GetThemeService} from "../../../services/get-theme.service";
import {LoginService} from "../../../services/login.service";
import {user} from "../../../models/user";
import {GetUserService} from "../../../services/get-user.service";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent implements OnInit {

  public user: user;
  public complementaryUser: user;
  public autenticado: boolean;

  public selectedInterest: theme;
  public selectedKnowledge: theme;
  public selectedDateTeach: Date;
  public selectedStartHourTeach: number;
  public selectedEndHourTeach: number;
  public selectedDateLearn: Date;
  public selectedStartHourLearn: number;
  public selectedEndHourLearn: number;
  public themeTeachList: theme[] = [];
  public themeLearnList: theme[] = [];
  reservationTeach: reservation;
  reservationLearn: reservation;

  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>, private loginService: LoginService,
              private themeService: GetThemeService, private UserService: GetUserService,
              private reservationService: ReservationService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthdate: new Date,
      imageUrl: ''
    };

    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if (this.autenticado) {
      this.getMyProfile();
      this.getComplementaryUser();
    } else {
      window.location.href = "/login";
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getMyProfile(){
    this.user = JSON.parse(localStorage.getItem('userJSON'));
    this.UserService.getUser(this.user.username).subscribe(
      response => {
        this.user = response;
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          //this.status = 'error';
        }
      }
    );

  }

  getComplementaryUser() {
    this.complementaryUser = this.reservationService.getComplementaryUser();
    console.log(this.complementaryUser);

    this.user.knowledges.forEach((t1) =>
      this.complementaryUser.interests.forEach((t2) => {
        if (t1.name == t2.name){
          this.themeTeachList.push(t1);
        }
      }
    ));

    this.user.interests.forEach((t1) =>
      this.complementaryUser.knowledges.forEach((t2) => {
          if (t1.name == t2.name){
            this.themeLearnList.push(t1);
          }
        }
      ));

  }

  makeReservation() {
    if (this.selectedInterest == undefined || this.selectedKnowledge == undefined ||
        this.selectedDateTeach == undefined || this.selectedStartHourTeach == undefined ||
        this.selectedEndHourTeach == undefined || this.selectedDateLearn == undefined ||
        this.selectedStartHourLearn == undefined || this.selectedEndHourLearn == undefined) {
          this.dialog.open(DialogCheckReservation);
    } else {
      this.reservationTeach = {
        id: "id",
        startTime: this.selectedStartHourTeach,
        finishTime: this.selectedEndHourTeach,
        date: this.selectedDateTeach,
        theme: this.selectedKnowledge,
        teacherUsername: this.user.username,
        studentUsername: this.complementaryUser.username
      }
      this.reservationLearn = {
        id: "id",
        startTime: this.selectedStartHourLearn,
        finishTime: this.selectedEndHourLearn,
        date: this.selectedDateLearn,
        theme: this.selectedInterest,
        teacherUsername: this.complementaryUser.username,
        studentUsername: this.user.username
      }
      this.reservationService.createReservation(this.reservationTeach).subscribe(response => {
        console.log(response);
        this.reservationService.createReservation(this.reservationLearn).subscribe(response => {
          console.log(response);
          this.dialog.open(DialogReservationDone);
        }, error => {
          this.dialog.open(DialogReservationFail);
        });
      }, error => {
        this.dialog.open(DialogReservationFail);
      });
    }
  }

  checkAvailabilityCalendar() {
    this.reservationService.setComplementaryUserAvailable();
    this.dialogRef.close();
    this.router.navigate(["/calendar"]);
  }

}


@Component({
  selector: 'app-dialogCheckReservation',
  templateUrl: 'dialogCheckReservation.html',
})
export class DialogCheckReservation {

  constructor(public dialogRef: MatDialogRef<DialogCheckReservation>) { }

  close(){
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-dialogReservationDone',
  templateUrl: 'dialogReservationDone.html',
})
export class DialogReservationDone {

  constructor(public dialogRef: MatDialogRef<DialogReservationDone>) { }

  redirectHome(){
    window.location.href = "homepage";
  }

}

@Component({
  selector: 'app-dialogReservationFail',
  templateUrl: 'dialogReservationFail.html',
})
export class DialogReservationFail {

  constructor(public dialogRef: MatDialogRef<DialogReservationFail>) { }

  close(){
    this.dialogRef.close();
  }

}
