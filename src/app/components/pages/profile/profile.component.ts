import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserService } from '../../../services/get-user.service';
import { LoginService } from '../../../services/login.service';
import { GetThemeService } from '../../../services/get-theme.service';
import { user } from 'src/app/models/user';
import { theme } from 'src/app/models/theme';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public starRating = 3;
  public userProfile: user;

  constructor( private activatedRoute: ActivatedRoute) { }

  getProfile(){

  }

  ngOnInit(): void {
    var profileUser = this.activatedRoute.snapshot.params.username;
    console.log(profileUser);

  }


}
