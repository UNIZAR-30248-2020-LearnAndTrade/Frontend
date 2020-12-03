import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {reservation} from "../models/reservation";
import {user} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public complementaryUser: user;
  private doubleCheck: boolean = false;
  public checkReservation: reservation;
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

  public complementaryUserAvailable() {
    console.log(this.doubleCheck);
    return this.doubleCheck;
  }

  public setComplementaryUserAvailable() {
    this.doubleCheck = true;
  }

  public setComplementaryUserUnavailable() {
    this.doubleCheck = false;
  }


  public setReservationToCheck(reservation) {
    this.checkReservation = reservation;
  }

  public getReservationToCheck() {
    return this.checkReservation;
  }

  public createReservation(reservation: reservation) {
    return this.http.post<reservation>(this.urlReservation + '/create', reservation);
  }

  public getReservationsForCalendar(username) {
    let params = new HttpParams().set("username",username); //Create new HttpParams
    return this.http.get(this.urlReservation + '/getAll', { params:params });
  }


}
