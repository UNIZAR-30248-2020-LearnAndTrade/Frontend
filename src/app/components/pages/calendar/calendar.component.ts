import { Component, OnInit } from '@angular/core';
import { ReservationService } from "../../../services/reservation.service";
import {reservation} from "../../../models/reservation";
import {user} from "../../../models/user";
import {GetUserService} from "../../../services/get-user.service";
import {LoginService} from "../../../services/login.service";
import {MatDialog} from "@angular/material/dialog";
import {GetReservationModalComponent} from "../../shared/get-reservation-modal/get-reservation-modal.component";
import {RateModalComponent} from "../../shared/rate-modal/rate-modal.component";
import {ConfirmImpartedLessonModalComponent} from "../../shared/confirm-imparted-lesson-modal/confirm-imparted-lesson-modal.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public user: user;
  public reservationsUser: reservation[] = [];

  public complementaryUser: user;
  public complementaryUserAvailable: boolean = false;
  public reservationsComplementaryUser: reservation[] = [];
  public autenticado: boolean;

  public month: number;
  public year: number;
  public daysOfMonth: Date[] = [];
  public numberOfDayOnAWeek: number = 0;
  public monthName: string;


  constructor(public reservationService: ReservationService, private UserService: GetUserService,
              private loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.complementaryUserAvailable = false;
    this.user = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthDate: new Date,
      imageUrl: '',
      password:''
    };

    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if (this.autenticado) {
      this.getMyProfile();
      this.getReservations();
      this.checkComplementaryUser();

      let day = new Date;
      this.month = day.getMonth() + 1;
      this.year = day.getFullYear();

      this.setMonthName();
      this.getDaysInMonth();

    } else {
      window.location.href = "/login";
    }
  }

  getMyProfile(){
    this.user = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.user);
    this.UserService.getUser(this.user.username).subscribe(
      response => {
        this.user = response;
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          //this.status = 'error';
        }
      }
    );
  }

  getReservations() {
    
    this.reservationService.getReservationsForCalendar(this.user.username).subscribe(response => {
      for (let index in response) {
        let r: reservation = {
          id: response[index].id,
          startTime: response[index].startTime,
          finishTime: response[index].finishTime,
          date: response[index].date,
          theme: response[index].theme,
          teacherUsername: response[index].teacherUsername,
          studentUsername: response[index].studentUsername,
          studentFinished: response[index].studentFinished,
          teacherFinished: response[index].teacherFinished,
          rating: response[index].rating,
        }
        this.reservationsUser.push(r);    
      }
    });
  }

  getReservationsComplementaryUser() {
    this.reservationService.getReservationsForCalendar(this.complementaryUser.username).subscribe(response => {
      for (let index in response) {
        let r: reservation = {
          id: response[index].id,
          startTime: response[index].startTime,
          finishTime: response[index].finishTime,
          date: response[index].date,
          theme: response[index].theme,
          teacherUsername: response[index].teacherUsername,
          studentUsername: response[index].studentUsername,
          studentFinished: response[index].studentFinished,
          teacherFinished: response[index].teacherFinished,
          rating: response[index].rating,
        }
        this.reservationsComplementaryUser.push(r);
      }
      console.log(this.complementaryUser);
      console.log(this.reservationsComplementaryUser);
    });
  }


  numberReturn(length){
    return new Array(length);
  }

  numberReturnSemanas(){
    let length = 6;
    return new Array(length);
  }

  getDaysInMonth() {
    let date = new Date(this.year, this.month - 1, 1);
    let days = [];
    while (date.getMonth() == this.month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    this.daysOfMonth = [];
    for (let i = 0; i < days.length; i++) {
      this.daysOfMonth.push(days[i]);
    }
    this.setMonthName();
    this.startDayOfMonth();
  }

  getDayOfWeek(number: number) {
    var weekday = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return weekday[number];
  }

  startDayOfMonth() {
    let numOfWeek = this.daysOfMonth[0].getDay();
    if (numOfWeek == 0) {
      this.numberOfDayOnAWeek = 6;
    } else {
      this.numberOfDayOnAWeek = numOfWeek - 1;
    }
  }

  backMonth() {
    if (this.month == 1 && this.year == 2020) {
      /* do nothing */
    } else if (this.month == 1 && this.year == 2021) {
      this.month = 12;
      this.year = 2020;
    } else {
      this.month--;
    }
    this.setMonthName();
    this.getDaysInMonth();
  }

  forwardMonth() {
    if (this.month == 12 && this.year == 2021) {
      /* do nothing */
    } else if (this.month == 12 && this.year == 2020) {
      this.month = 1;
      this.year = 2021;
    } else {
      this.month++;
    }
    this.setMonthName();
    this.getDaysInMonth();
  }
  
  /**
   * 
   * @param hour hour of meeting
   * @param date date of meeting
   * @returns 0 -> not reserved
   *          1 -> user reservation
   *          2 -> complementary reservation
   *          3 -> pending of finished
   *          4 -> pending of rating
   *          5 -> nothing to do
   */
  public isReserved(hour: number, date: Date) : number {
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth();
    let today_year = today.getFullYear();
    let username = JSON.parse(localStorage.getItem('userJSON')).username;
    for (let i = 0; i < this.reservationsUser.length; i++) {
      // Loop for searching reservation
      let dateReservation = new Date(this.reservationsUser[i].date);
      if (dateReservation.getMonth() == date.getMonth() &&
        dateReservation.getDate() == date.getDate() &&
        this.reservationsUser[i].startTime <= hour &&
        this.reservationsUser[i].finishTime > hour) {
        
          if (dateReservation.getFullYear() > today_year ||
            dateReservation.getMonth() > today_month ||
            dateReservation.getDate() >= today_day ) {
            // Future meetings -> further years, further months, further days
            return 1;
          }
          // Also rated -> finished OR lesson finished and teacher
          else if (this.reservationsUser[i].rating > -1 || 
                  (this.reservationsUser[i].studentFinished && 
                    this.reservationsUser[i].teacherFinished &&
                    username == this.reservationsUser[i].teacherUsername)){
            return 5;
          }
          // Not future meeting
          else if ( this.reservationsUser[i].studentFinished && 
                    this.reservationsUser[i].teacherFinished &&
                    username == this.reservationsUser[i].studentUsername){
            // Lesson imparted and should be rated
            return 4;
          }
          else{
            // Lesson not gived/received nor rated
            return 3;
          }
      }
    }
    if (this.complementaryUserAvailable) {
      for (let i = 0; i < this.reservationsComplementaryUser.length; i++) {
        let dateReservation = new Date(this.reservationsComplementaryUser[i].date);
        if (dateReservation.getMonth() == date.getMonth() &&
          dateReservation.getDate() == date.getDate() &&
          this.reservationsComplementaryUser[i].startTime <= hour &&
          this.reservationsComplementaryUser[i].finishTime > hour) {
          return 2;
        }
      }
    }
    return 0;
  }

  openModalReservation(hour: number, date: Date) {
    for (let i = 0; i < this.reservationsUser.length; i++) {
      let dateReservation = new Date(this.reservationsUser[i].date);
      if (dateReservation.getMonth() == date.getMonth() &&
        dateReservation.getDate() == date.getDate() &&
        this.reservationsUser[i].startTime <= hour &&
        this.reservationsUser[i].finishTime > hour) {
        this.reservationService.setReservationToCheck(this.reservationsUser[i]);
        this.dialog.open(GetReservationModalComponent);
      }
    }
  }

  openRatingModal(hour: number, date: Date){
    for (let i = 0; i < this.reservationsUser.length; i++) {
      let dateReservation = new Date(this.reservationsUser[i].date);
      if (dateReservation.getMonth() == date.getMonth() &&
        dateReservation.getDate() == date.getDate() &&
        this.reservationsUser[i].startTime <= hour &&
        this.reservationsUser[i].finishTime > hour) {
          this.reservationService.setReservationToCheck(this.reservationsUser[i]);
          this.dialog.open(RateModalComponent);
      }
    }
  }

  openConfirmImpartedModal(hour: number, date: Date){
    for (let i = 0; i < this.reservationsUser.length; i++) {
      let dateReservation = new Date(this.reservationsUser[i].date);
      if (dateReservation.getMonth() == date.getMonth() &&
        dateReservation.getDate() == date.getDate() &&
        this.reservationsUser[i].startTime <= hour &&
        this.reservationsUser[i].finishTime > hour) {
          this.reservationService.setReservationToCheck(this.reservationsUser[i]);
          this.dialog.open(ConfirmImpartedLessonModalComponent);
      }
    }
  }

  checkComplementaryUser(){
    if (this.reservationService.complementaryUserAvailable()) {
      console.log("available");
      this.complementaryUser = this.reservationService.getComplementaryUser();
      this.complementaryUserAvailable = true;
      this.getReservationsComplementaryUser();
      this.reservationService.setComplementaryUserUnavailable();
    }
  }

  private setMonthName(){
    var months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    this.monthName = months[this.month-1];
  }

}
