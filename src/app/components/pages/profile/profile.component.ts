import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserService } from '../../../services/get-user.service';
import { LoginService } from '../../../services/login.service';
import { user } from 'src/app/models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public starRating = 1.5;
  public userProfile: user;
  public authenticated: boolean;
  public status: string;

  constructor( private activatedRoute: ActivatedRoute, private UserService: GetUserService,
    private loginService: LoginService) { }

  getProfile(username: string){
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
    this.getProfile(profileUser);
  }


}
