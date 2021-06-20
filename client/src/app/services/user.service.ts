import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedChanged = new Subject<boolean>();
  //private loggedChanged: boolean = false;
  public apiUser = environment.apiUrl+"user/";

  constructor(private router:Router,
    private http:HttpClient) { }
  /**
   * Método que permite loguearse a un usuario y setea el localStorage con el token
   *
   * @param {*} token
   * @memberof UserService
   */
  login(token: any): void {
    localStorage.setItem('token', token);
    this.loggedChanged.next(true);
  }

  /**
   * Método que permite el registro de usuarios
   *
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof UserService
   */
  register(formData:any):Observable<any>{
    return this.http.post(this.apiUser+'register',formData);
  }
/**
 * Método que desloguea a un usuario
 *
 * @memberof UserService
 */
logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
    this.loggedChanged.next(false);
    window.location.reload();
  }

  /**
   * Método que permite el registro de un usuario
   *
   * @return {*}  {Observable<any>}
   * @memberof UserService
   */
  getAllUsers():Observable<any>{
    return this.http.get(this.apiUser+"all");
  }

  /**
   * Método que actualiza los datos de un usuario
   *
   * @param {*} idUser
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof UserService
   */
  updateUser(idUser:any,formData:any):Observable<any>{
    return this.http.put(this.apiUser+'edit/'+idUser,formData);
  }

  /**
   * Método que actualiza la contraseña de un usuario
   *
   * @param {*} idUser
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof UserService
   */
  updatePassword(idUser:any,formData:any):Observable<any>{
    return this.http.put(this.apiUser+'password/'+idUser,formData);
  }

  /**
   * Método que determina si un usuario está logueado
   *
   * @return {*}
   * @memberof UserService
   */
  isUserLoggedIn() {
    return this.loggedChanged;
  }

  /**
   * Método que determina si existe el localStorage para el usuario
   *
   * @return {*}
   * @memberof UserService
   */
  isUserLogged(){
    return localStorage.getItem('usuario');
  }
}
