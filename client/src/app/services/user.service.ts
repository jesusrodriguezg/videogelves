import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private loggedChanged = new Subject<boolean>();
  private loggedChanged: boolean = false;
  constructor() { }

  login(token: any): void {
    localStorage.setItem('token', token);
    this.loggedChanged = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedChanged = false;
  }
  isUserLoggedIn(): boolean {
    return this.loggedChanged;
  }
}
