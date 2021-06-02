import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private loggedChanged = new Subject<boolean>();
  private loggedChanged: boolean = false;
  constructor(private router:Router) { }

  login(token: any): void {
    localStorage.setItem('token', token);
    //  this.loggedChanged = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
    this.loggedChanged = false;
  }

  // PARA CARGÁRSELO
  isUserLoggedIn(): boolean {
    return this.loggedChanged;
  }
}
