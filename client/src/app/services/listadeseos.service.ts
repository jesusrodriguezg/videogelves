import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListadeseosService {

  public apiListaDeseos: string = environment.apiUrl + "listaDeseos/";
  private headers: any = {'content-type': 'application/json'};

  constructor(private http: HttpClient) {
  }

  /**
   * Método que recupera los productos que un usuario tiene en su lista de deseos
   *
   * @param {*} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof ListadeseosService
   */
  getListaDeseos(idUsuario:any):Observable<any>{
    return this.http.get(this.apiListaDeseos+idUsuario);
  }

  /**
   * Método que inserta un producto en la lista de deseos de un usuario
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ListadeseosService
   */
  addListaDeseos(idUsuario:any, idProducto:any):Observable<any>{
    const body = {'id_usuario': idUsuario, 'id_producto': idProducto};
    return this.http.post(this.apiListaDeseos+"add/"+idUsuario+"/"+idProducto,body);
  }

  /**
   *Método que elimina un producto de la lista de deseos de un usuario
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ListadeseosService
   */
  deleteListaDeseos(idUsuario:any, idProducto:any):Observable<any>{
    return this.http.delete(this.apiListaDeseos+"delete/"+idUsuario+"/"+idProducto);
  }

  /**
   * Método que comprueba si un usuario tiene un producto en su lista de deseos
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ListadeseosService
   */
  searchListaDeseos(idUsuario:any, idProducto:any):Observable<any>{
    return this.http.get(this.apiListaDeseos+"search/"+idUsuario+"/"+idProducto);
  }
}
