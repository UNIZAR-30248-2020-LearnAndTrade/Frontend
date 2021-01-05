import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './router/app.routing';
import { homepageComponent } from './components/pages/homepage/homepage.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { RootComponent } from './root/root.component';
import { DialogConfirmDialog, DialogErrorEdit } from './components/pages/homepage/homepage.component';
import { DialogCheckReservation, DialogReservationDone, DialogReservationFail } from "./components/shared/reservation-modal/reservation-modal.component";

import { ScrollingModule} from '@angular/cdk/scrolling';

// Imports Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Import Angular Material
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';




import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservationModalComponent } from './components/shared/reservation-modal/reservation-modal.component';
import { CalendarComponent } from './components/pages/calendar/calendar.component';
import { GetReservationModalComponent } from './components/shared/get-reservation-modal/get-reservation-modal.component';
import { RateModalComponent } from './components/shared/rate-modal/rate-modal.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ConfirmImpartedLessonModalComponent } from './components/shared/confirm-imparted-lesson-modal/confirm-imparted-lesson-modal.component';




@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    homepageComponent,
    LoginComponent,
    ProfileComponent,
    DialogConfirmDialog,
    DialogErrorEdit,

    ChatComponent,
    SignupComponent,
    DialogCheckReservation,
    DialogReservationDone,
    DialogReservationFail,
    ReservationModalComponent,
    CalendarComponent,
    GetReservationModalComponent,
    RateModalComponent,
    SearchComponent,
    DialogErrorEdit,
    ConfirmImpartedLessonModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    CommonModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    ScrollingModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,

    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatSnackBarModule,

  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
