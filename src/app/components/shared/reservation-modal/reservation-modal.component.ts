import {Component, OnInit} from '@angular/core';
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
  public themeTeachList: theme[] = [];
  public themeLearnList: theme[] = [];
  reservationTeach: reservation;
  reservationLearn: reservation;

  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>, private loginService: LoginService,
              private themeService: GetThemeService, private UserService: GetUserService,
              private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthdate: new Date
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

}
