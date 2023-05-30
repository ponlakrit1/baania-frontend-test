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

@NgModule({
  declarations: [
    AppComponent,
    HouseComponent,
    ConfirmDialogComponent
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
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
