import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './router/app.routing';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    HeaderComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
