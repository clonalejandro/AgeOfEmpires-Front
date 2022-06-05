import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent  {

  private hide: boolean = true;
  constructor() {}

  public toggleHide() {
    this.hide = !this.hide;
  }

  public isHide(): boolean {
    return this.hide;
  }
}