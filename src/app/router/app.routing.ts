import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//Componentes de páginas web
import { PrincipalComponent } from '../components/pages/principal/principal.component';
import { ProfileComponent } from '../components/pages/profile/profile.component';

//Servicios (API)




const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  { path: 'profile/:username', component: ProfileComponent }, 
  { path: 'principal', component: PrincipalComponent },
  { path: '**', redirectTo: 'principal'}, 
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
