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
  public apiUser = environment.apiUrl+"user/";

  constructor(private router:Router,
    private http:HttpClient) { }

  login(token: any): void {
    localStorage.setItem('token', token);
    this.loggedChanged = true;
  }

  // Método que permite el registro de usuarios
  register(formData:any):Observable<any>{
    return this.http.post(this.apiUser+'register',formData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
    this.loggedChanged = false;
  }

  updateUser(idUser:any,formData:any):Observable<any>{
    return this.http.put(this.apiUser+'edit/'+idUser,formData);
  }

  updatePassword(idUser:any,formData:any):Observable<any>{
    return this.http.put(this.apiUser+'password/'+idUser,formData);
  }

  // PARA CARGÁRSELO
  isUserLoggedIn(): boolean {
    return this.loggedChanged;
  }

  isUserLogged(){
    return localStorage.getItem('usuario');
  }
}
