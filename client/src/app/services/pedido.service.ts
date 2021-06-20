import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiPedidos: string =  environment.apiUrl + "pedidos/";
  private headers = {'content-type': 'application/json'};

  constructor(private http: HttpClient) { }

  /**
   * Método que crea una fila en DETALLE_PEDIDO, o bien actualiza la cantidad de una fila existente
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  createDetallePedido(idUsuario:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.post(this.apiPedidos+"add/"+idUsuario+"/"+idProducto, body, {'headers':this.headers});
  }

  /**
   * Método que comprueba si un usuario tiene un producto está en un DETALLE_PEDIDO abierto
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  checkDetallePedido(idUsuario:any,idProducto:any):Observable<any>{
    return this.http.get(this.apiPedidos+"check/"+idUsuario+"/"+idProducto);
  }

  /**
   * Método que devuelve los productos del carrito (en DETALLE_PEDIDO y no comprados)
   *
   * @param {*} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  getCarrito(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"carrito/"+idUsuario);
  }
/**
 * Método que borra todos los productos del carrito
 *
 * @param {*} idUsuario
 * @return {*}  {Observable<any>}
 * @memberof PedidoService
 */
  deleteCarrito(idUsuario:any):Observable<any>{
    return this.http.delete(this.apiPedidos+"carrito/delete/"+idUsuario);
  }

  /**
   * Método que quita un producto del carrito
   *
   * @param {*} idUsuario
   * @param {*} idProducto
   * @return {*}
   * @memberof PedidoService
   */
  deleteProductoCarrito(idUsuario:any,idProducto:any){
    return this.http.delete(this.apiPedidos+"carrito/deleteprod/"+idUsuario+"/"+idProducto);
  }

  /**
   * Método que añade una copia de un producto que ya está en el carrito
   *
   * @param {*} idPedido
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  addCopia(idPedido:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"carrito/addcopia/"+idPedido+"/"+idProducto, body);
  }

  /**
   * Método que quita una copia de un producto que ya está en el carrito
   *
   * @param {*} idPedido
   * @param {*} idProducto
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  deleteCopia(idPedido:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"carrito/deletecopia/"+idPedido+"/"+idProducto, body);
  }

  /**
   * Método que obtiene el importe total de los productos del carrito
   *
   * @param {*} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  getImporteCarrito(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"carrito/importe/"+idUsuario);
  }

  /**
   * Método que efectúa y cierra la compra
   *
   * @param {*} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  compra(idUsuario:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"compra/"+idUsuario,body);
  }

  /**
   * Método que obtiene todas las compras realizadas
   *
   * @param {*} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  getCompras(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/all/"+idUsuario);
  }

  /**
   * Método que obtiene el detalle de una compra realizada
   *
   * @param {*} idPedido
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  getDetalleCompra(idPedido:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/detalle/"+idPedido);
  }

  /**
   * Método que comprueba si la fecha de devolución ha expirado o no
   *
   * @param {*} idPedido
   * @return {*}  {Observable<any>}
   * @memberof PedidoService
   */
  checkFechaDevolucion(idPedido:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/fecha/"+idPedido);
  }

  /**
   * Método que permite devolver un producto
   *
   * @param {*} idPedido
   * @param {*} idProducto
   * @return {*}
   * @memberof PedidoService
   */
  devolverProducto(idPedido:any,idProducto:any){
    const body = {};
    return this.http.put(this.apiPedidos+"compra/devolver/"+idPedido+"/"+idProducto,body);
  }
}
