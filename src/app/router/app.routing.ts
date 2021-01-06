import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// Componentes de páginas web
import { homepageComponent } from '../components/pages/homepage/homepage.component';

import { LoginComponent } from '../components/pages/login/login.component';

import { ProfileComponent } from '../components/pages/profile/profile.component';

import { ChatComponent } from '../components/pages/chat/chat.component';
import { SignupComponent } from '../components/pages/signup/signup.component';


import { CalendarComponent } from '../components/pages/calendar/calendar.component';

import { SearchComponent } from "../components/pages/search/search.component";


// Servicios (API)




const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },

  { path: 'homepage', component: homepageComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'search', component: SearchComponent},
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
