import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
    '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PanelComponent } from './panel.component';

@NgModule({
  declarations: [
    PanelComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [PanelComponent]
})
export class PanelModule { }
