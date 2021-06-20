import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public apiProductos: string = environment.apiUrl + "productos/";
  public apiCategorias: string = environment.apiUrl + "categorias/";
  private headers = {'content-type': 'application/json'};

  constructor(private http: HttpClient) {
  }

  /**
   * Método para pedir todos los productos
   *
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  getProductos():Observable<any>{
    return this.http.get(this.apiProductos);
  }

  /**
   * Método para pedir un producto concreto
   *
   * @param {string} nombreProducto
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  getProductoDetalle(nombreProducto:string):Observable<any>{
    return this.http.get(this.apiProductos+""+nombreProducto);
  }

  /**
   * Método para pedir todos los productos de una categoría
   *
   * @param {string} nombreCategoria
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  getProductosCategoria(nombreCategoria:string):Observable<any>{
    return this.http.get(this.apiCategorias+"all/"+nombreCategoria);
  }

  /**
   * Método que sirve para "convertir" el ID en el NOMBRE_CATEGORIA
   *
   * @param {*} idCategoria
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  getNombreCategoria(idCategoria:any):Observable<any>{
    return this.http.get(this.apiCategorias+"nombre/"+idCategoria);
  }

  /**
   * Método para dejar a 0 el stock de un producto
   *
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  deleteStockProducto(idProducto:any):Observable<any>{
    const body = { stock: 0 };
    return this.http.put(this.apiProductos+'delete/'+idProducto,body,{'headers':this.headers});
  }

  /**
   * Método para actualizar un producto
   *
   * @param {*} idProducto
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  updateProducto(idProducto:any,formData:any):Observable<any>{
    const body = formData;
    return this.http.put(this.apiProductos+'update/'+idProducto,body,{'headers':this.headers});
  }

  /**
   * Método que permite el registro de usuarios
   *
   * @param {*} formData
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  createProducto(formData:any):Observable<any>{
    return this.http.post(this.apiProductos+"create/",formData);
  }

  /**
   * Método que comprueba si un producto tiene stock
   *
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  checkStock(idProducto:any):Observable<any>{
    return this.http.get(this.apiProductos+"stock/check/"+idProducto);
  }

  /**
   * Método que añade una o varias unidades de stock a un producto
   *
   * @param {*} idProducto
   * @param {*} cantidad
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  addStock(idProducto:any,cantidad:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiProductos+"stock/add/"+idProducto+"/"+cantidad,body);
  }

  /**
   * Método que quita una unidad de stock de un producto
   *
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  removeStock(idProducto:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiProductos+"stock/remove/"+idProducto,body);
  }

  /**
   * Método que busca productos a través de la barra de búsqueda
   *
   * @param {*} nombreProducto
   * @return {*}  {Observable<any>}
   * @memberof ProductoService
   */
  search(nombreProducto:any):Observable<any>{
    return this.http.get(this.apiProductos+"search/"+nombreProducto);
  }
}
