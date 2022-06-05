import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
    '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
