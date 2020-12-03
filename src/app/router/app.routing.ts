import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//Componentes de páginas web
import { homepageComponent } from '../components/pages/homepage/homepage.component';

import { LoginComponent } from '../components/pages/login/login.component';

import { ProfileComponent } from '../components/pages/profile/profile.component';

import { CalendarComponent } from "../components/pages/calendar/calendar.component";


//Servicios (API)




const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },

  { path: 'homepage', component: homepageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: '**', redirectTo: 'homepage'}


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
