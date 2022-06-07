import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import NotificationType from 'src/interfaces/INotificationType';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent  {

  public loginForm: FormGroup;
  private hide: boolean = true;
  private apiUrl = 'http://localhost:3000';

  constructor(private fb: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) {
    if (localStorage.getItem('token') !== null) {
      window.location.href = '/panel';
    }
    
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public toggleHide() {
    this.hide = !this.hide;
  }

  public isHide(): boolean {
    return this.hide;
  }

  public submitLogin() {
    const [username, password] = ['username', 'password']
      .map(field => this.loginForm.get(field)?.value);
    this.fetchLogin(username, password);
  }

  private addNotification(message: string, type: NotificationType = 'info'): void {
    this._snackBar.open(message, '', {
        duration: 5 * 1000,
        panelClass: `notification-${type}`,
    });
  }

  private fetchLogin(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    this.http.post(`${this.apiUrl}/login`, { username, password })
      .subscribe(
        user => {
          localStorage.setItem('token', JSON.stringify(user));
          window.location.href = '/panel';
        },
        error => {
          if (error.status === 401 || error.status === 403) {
            this.addNotification('Invalid username or password', 'error');
          }
          else {
            this.addNotification('Something went wrong', 'error');
          }
        })
  }
}