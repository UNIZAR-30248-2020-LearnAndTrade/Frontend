import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GetUserService } from '../../../services/get-user.service';
import { LoginService } from '../../../services/login.service';
import { user } from 'src/app/models/user';
import {ChatService} from "../../../services/chat.service";
import {ReservationService} from "../../../services/reservation.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public miPerfil: user;

  public starRating = 1.5;
  public userProfile: user;
  public authenticated: boolean;
  public status: string;

  constructor( private activatedRoute: ActivatedRoute, private UserService: GetUserService,
    private loginService: LoginService, private chatService: ChatService, private router: Router) { }

  getProfile(username: string){
    this.miPerfil = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthdate: new Date,
      imageUrl: ''
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
  }

  getMyProfile(){
    this.miPerfil = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.miPerfil);
    this.UserService.getUser(this.miPerfil.username).subscribe(
      response => {
        this.miPerfil = response;
      });
  }

  newChat() {
    this.chatService.createRoom(this.miPerfil.username, this.userProfile.username).subscribe( result => {
      console.log(result);
      this.goToChat();
    })
  }

  goToChat() {
    this.router.navigate(["/chat"]);
  }


}
