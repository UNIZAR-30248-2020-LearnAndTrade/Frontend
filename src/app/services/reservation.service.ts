import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {reservation} from "../models/reservation";
import {user} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public complementaryUser: user;
  public urlReservation: string;

  constructor(private http: HttpClient) {
    this.urlReservation = 'https://learn-and-trade-backend.herokuapp.com/reservation';
  }

  public setComplementaryUser(user: user) {
    this.complementaryUser = user;
  }

  public getComplementaryUser() {
    return this.complementaryUser;
  }

  public crearReserva(reservation: reservation) {
    return this.http.post<reservation>(this.urlReservation + '/create', reservation);
  }

}
