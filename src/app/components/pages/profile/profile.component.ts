import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GetUserService } from '../../../services/get-user.service';
import { LoginService } from '../../../services/login.service';
import { user } from 'src/app/models/user';
import { reservation } from '../../../models/reservation';
import {ChatService} from "../../../services/chat.service";
import {ReservationService} from "../../../services/reservation.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public myprofile: user;

  public userProfile: user;
  public authenticated: boolean;
  public status: string;
  public avgByTheme: Map<string, number>;

  private rateByTheme: Map<string, Array<number>>;

  constructor( private activatedRoute: ActivatedRoute, private UserService: GetUserService,
               private loginService: LoginService, private chatService: ChatService, private router: Router,
               private reservationService:ReservationService) { 
      this.rateByTheme = new Map();
      this.avgByTheme = new Map();
  }

  ngOnInit(): void {
    var profileUser = this.activatedRoute.snapshot.params.username;

    this.authenticated = this.loginService.isAuthenticated();
    if(this.authenticated) {
      this.getMyProfile();
    }
    this.getProfile(profileUser);
  }

  newChat() {
    this.chatService.createRoom(this.myprofile.username, this.userProfile.username).subscribe( result => {
      console.log(result);
      this.goToChat();
    })
  }

  goToChat() {
    this.router.navigate(["/chat"]);
  }

  private getProfile(username: string){
    this.myprofile = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthDate: new Date,
      imageUrl: '',
      password: ''
    };

    this.userProfile = JSON.parse(localStorage.getItem('userJSON'));
    this.UserService.getUser(username).subscribe(
      response => {
        this.userProfile = response;
        this.getRating(username);
        console.log(response);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  private getMyProfile(){
    this.myprofile = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.myprofile);
    this.UserService.getUser(this.myprofile.username).subscribe(
      response => {
        this.myprofile = response;
      });
  }

  private isTeacher(r:reservation): boolean{
    return this.userProfile.username == r.teacherUsername;
  }

  private isFinished(r:reservation): boolean{
    return r.studentFinished && r.teacherFinished;
  }

  private getRating(username: string){
    this.reservationService.getReservationsForCalendar(username).subscribe(response => {
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
        if(this.isFinished(r) && this.isTeacher(r)) {
          // Only adds rate if finished and is student
          let rateList: Array<number>;
          if(this.rateByTheme.has(r.theme.name)){
            rateList = this.rateByTheme.get(r.theme.name);
            rateList.push(r.rating);
            this.rateByTheme.set(r.theme.name, rateList);
          }
          else{
            this.rateByTheme.set(r.theme.name, [r.rating]);
          }
        }
      }
      this.calculateAVG();
    });
  }

  /**
   *  
   * @param theme theme for calcultaing AVG
   * @returns n -1 -> not rates available
   *            >= 0 -> AVG
   */
  private calculateAVGRateByTheme(theme: string) : number{
    if(this.rateByTheme.has(theme)){
      let rates = this.rateByTheme.get(theme);
      let rateAVG:number = 0;
      for (let r of rates) {
        rateAVG = rateAVG + r;
      }
      return rateAVG/rates.length;
    }
    else{
      return -1;
    }
  }

  private calculateAVG(){
    for(let t of this.userProfile.knowledges){
      let avg = this.calculateAVGRateByTheme(t.name);
      if (avg > -1){
        this.avgByTheme.set(t.name, avg);
      }
    }
    console.log(this.avgByTheme);
  }

}
