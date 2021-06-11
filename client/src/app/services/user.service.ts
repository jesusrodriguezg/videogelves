import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private loggedChanged = new Subject<boolean>();
  private loggedChanged: boolean = false;
  constructor(private router:Router,
    private http:HttpClient) { }

  login(token: any): void {
    localStorage.setItem('token', token);
    this.loggedChanged = true;
  }

  // Método que permite el registro de usuarios
  register(formData:any):Observable<any>{
    return this.http.post(environment.apiUrl+'register',formData);
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

  isUserLogged(){
    return localStorage.getItem('usuario');
  }
}
