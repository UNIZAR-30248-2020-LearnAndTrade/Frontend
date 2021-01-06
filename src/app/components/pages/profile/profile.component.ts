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

  public starRating = 1.5;
  public userProfile: user;
  public authenticated: boolean;
  public status: string;
  public avgByTheme: Map<string, number>;

  private rateByTheme: Map<string, Array<number>>;

  constructor( private activatedRoute: ActivatedRoute, private UserService: GetUserService,
    private loginService: LoginService, private chatService: ChatService, private router: Router,
    private reservationService:ReservationService) { 
      this.rateByTheme = new Map();
    }

  getProfile(username: string){
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
    console.log(this.userProfile);
    this.UserService.getUser(username).subscribe(
      response => {
        this.userProfile = response;
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

  ngOnInit(): void {
    var profileUser = this.activatedRoute.snapshot.params.username;

    this.authenticated = this.loginService.isAuthenticated();
    if(this.authenticated) {
      this.getMyProfile();
    }
    this.getProfile(profileUser);
    this.getRating();
    this.calculateAVG();
  }

  getMyProfile(){
    this.myprofile = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.myprofile);
    this.UserService.getUser(this.myprofile.username).subscribe(
      response => {
        this.myprofile = response;
      });
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

  private isStudent(r:reservation){
    return this.myprofile.username == r.studentUsername;
  }

  private isFinished(r:reservation){
    return r.studentFinished && r.teacherFinished;
  }

  private getRating(){
    this.reservationService.getReservationsForCalendar(JSON.parse(localStorage.getItem('userJSON')).username).subscribe(response => {
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
        if(this.isFinished(r) && this.isStudent(r)) {
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
      console.log(this.rateByTheme);
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
      for (let i = 0; 0 < rates.length; i++) {
        rateAVG = rateAVG + rates[i];
      }
      return rateAVG/this.rateByTheme.get(theme).length;
    }
    else{
      return -1;
    }
  }

  private calculateAVG(){
    this.rateByTheme.forEach((value: number[], key: string) => {
      this.avgByTheme.set(key, this.calculateAVGRateByTheme(key));
    });
    console.log("avgByTheme " + this.avgByTheme);
  }

}
