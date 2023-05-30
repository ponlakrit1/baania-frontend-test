import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HouseComponent } from './components/house/house.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmationDialogService } from './components/confirm-dialog/confirm-dialog.service';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { AlertDialogService } from './components/alert-dialog/alert-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    HouseComponent,
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    ConfirmationDialogService,
    AlertDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
