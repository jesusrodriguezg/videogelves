import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  private apiValoraciones = environment.apiUrl + "valoraciones/"

  constructor(private http:HttpClient) { }
/**
 * Método que obtiene las valoraciones de un producto
 *
 * @param {*} idProducto
 * @return {*}  {Observable<any>}
 * @memberof ValoracionService
 */
  getValoraciones(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+idProducto);
  }

  /**
   * Método que obtiene el número de comentarios de un producto
   *
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ValoracionService
   */
  getValoracionesCount(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+"count/"+idProducto);
  }

  /**
   * Método que obtiene la puntuación media de un producto
   *
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ValoracionService
   */
  getPuntuacion(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+"puntuacion/"+idProducto);
  }

  /**
   * Método que permite introducir un comentario para un producto
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof ValoracionService
   */
  addValoracion(idUsuario:any,idProducto:any,formData:any):Observable<any>{
    return this.http.post(this.apiValoraciones+"add/"+idUsuario+"/"+idProducto,formData);
  }
/**
 * Método que permite buscar si un usuario ha valorado un producto
 *
 * @param {*} idUsuario
 * @param {*} idProducto
 * @return {*}  {Observable<any>}
 * @memberof ValoracionService
 */
searchValoracion(idUsuario:any,idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+"search/"+idUsuario+"/"+idProducto);
  }

}
