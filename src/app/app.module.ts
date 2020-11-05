import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




import { AppRoutingModule } from './router/app.routing';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RootComponent } from './root/root.component';

// Imports Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Import Angular Material
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    PrincipalComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
