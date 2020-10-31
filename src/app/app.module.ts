import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './router/app.routing';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RootComponent } from './root/root.component';

import { ScrollingModule} from '@angular/cdk/scrolling';

// Imports Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Import Angular Material
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';







@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    NoopAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ScrollingModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
