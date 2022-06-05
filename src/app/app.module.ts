import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
    '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { PanelModule } from './panel/panel.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    PanelModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
