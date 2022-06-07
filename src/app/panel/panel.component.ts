import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import IFavourite from 'src/interfaces/IFavourite';
import ICivilization from '../../interfaces/ICivilization';
import NotificationType from '../../interfaces/INotificationType';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})

export class PanelComponent  {
    constructor (private _snackBar: MatSnackBar, private http: HttpClient) {}
    
    private showOnlyFavourites: boolean = false;
    private civilizations: ICivilization[] = [];
    private favourites: IFavourite[] = new Array();
    private token: string = '';
    private apiUrl = 'http://localhost:3000/api';

    private addNotification(message: string, type: NotificationType = 'info'): void {
      this._snackBar.open(message, '', {
          duration: 5000,
          panelClass: `notification-${type}`,
      });
    }

    private sendError(error: any): void {
      this.addNotification(error.message || error, 'error');
    }

    public ngOnInit() {
      const strJson = localStorage.getItem('token') || '{}';
      const { token } = JSON.parse(strJson);
      this.token = token;

      this.http.get(`${this.apiUrl}/civilizations`).subscribe(
        (civilizations: any) => {
          this.civilizations = civilizations || [];
        },
        err => this.sendError(err)
      );

      if (token) {
        this.http.get(`${this.apiUrl}/favourites?token=${this.token}`).subscribe(
          (favourites: any) => {
            this.favourites = favourites || [];
          },
          err => {
              this.sendError(err);
          }
        );
      }
    }

    public handleFavourite(civilizationId: number): void {
        if (this.isFavourite(civilizationId)){
            this.http.delete(`${this.apiUrl}/favourite?token=${this.token}`, {
                body: {
                    civilization_id: civilizationId,
                }
            })
            .subscribe(
              () => {
                this.addNotification('Civilization removed from favourites', 'warning');
                this.favourites = this.favourites.filter(favourite => favourite.civilization_id !== civilizationId);
              },
              err => this.sendError(err)
            );
        }
        else if (this.favourites.length < 3) {
            this.http.post(`${this.apiUrl}/favourite?token=${this.token}`, { 
              civilization_id: civilizationId, 
            })
            .subscribe(
              () => {
                this.addNotification('Civilization added to favourites');
                this.favourites.push({civilization_id: civilizationId});
              },
              err => this.sendError(err)
            );
        } else {
            this.sendError({ message: 'You can only have 3 favourites' });
        }
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    public getCivilizations(): ICivilization[] {
        return this.showOnlyFavourites ? 
            this.civilizations.filter(civilization => this.isFavourite(civilization.id)) : 
            this.civilizations;
    }

    public toggleShowFavourites(): void {
        this.showOnlyFavourites = !this.showOnlyFavourites;
    }

    public isFavourite(civilizationId: number): boolean {
        return this.favourites.some(favourite => favourite.civilization_id === civilizationId);
    }

    public destroySession(): void {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}