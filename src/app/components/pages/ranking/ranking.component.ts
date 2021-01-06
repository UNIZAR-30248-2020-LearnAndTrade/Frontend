import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GetThemeService } from '../../../services/get-theme.service';
import {user} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {SearchUsersService} from "../../../services/search-users.service";
import {theme} from "../../../models/theme";
import {ranking} from "../../../models/ranking";
import {ReservationModalComponent} from "../../shared/reservation-modal/reservation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";
import {GetUserService} from "../../../services/get-user.service";
import {ChatService} from "../../../services/chat.service";
import {RankingService} from "../../../services/ranking.service"
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  


  public themesList: theme[] = [];
  public theme: string;
  public usuarios: ranking[];
  public miPerfil: user;

  public interestsList: theme[] = [];
  public knowledgesList: theme[] = [];
  public selectedInterest: theme;
  public selectedKnowledge: theme;

  public selectingInterest: boolean = true;

  public autenticado: boolean;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  

  constructor(private loginService: LoginService, private ThemeService: GetThemeService,
    private searchUsersService: SearchUsersService, public dialog: MatDialog,
    private reservationService: ReservationService, private router: Router,
    private UserService: GetUserService, private chatService: ChatService,
    private RankingService: RankingService) { }

  ngOnInit(): void {
    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if(this.autenticado){
      this.getThemes();
    } else {
      window.location.href = "/login";
    }
  }

  buscar(interest){
    console.log(interest.name);
    this.theme = interest.name;
    this.RankingService.search(interest.name).subscribe(
      response => {
        console.log(response);
        this.usuarios = response;
        
      },
      error => {
        console.log("errorMessage");
      }
    );
  }

  getThemes(){
    this.ThemeService.getTheme().subscribe(
      response => {
        this.themesList = response;
        console.log(this.themesList);
      });
  }
  goToProfile(username) {
    this.router.navigate(["/profile/" + username]);
  }

  
}
