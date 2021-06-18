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

  // Método que crea una fila en DETALLE_PEDIDO, o bien actualiza la cantidad de una fila existente
  // Manda un ID_USUARIO con el que comprueba si existe un PEDIDO, para comprobar luego si hay DETALLE_PEDIDO
  // Manda también un ID_PRODUCTO para comprobar si hay DETALLE_PEDIDO y crear / actualizar la fila
  createDetallePedido(idUsuario:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.post(this.apiPedidos+"add/"+idUsuario+"/"+idProducto, body, {'headers':this.headers});
  }

  // Método que comprueba si un usuario tiene un producto está en un DETALLE_PEDIDO abierto
  checkDetallePedido(idUsuario:any,idProducto:any):Observable<any>{
    return this.http.get(this.apiPedidos+"check/"+idUsuario+"/"+idProducto);
  }

  // Método que devuelve los productos del carrito (en DETALLE_PEDIDO y no comprados)
  getCarrito(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"carrito/"+idUsuario);
  }

  deleteCarrito(idUsuario:any):Observable<any>{
    return this.http.delete(this.apiPedidos+"carrito/delete/"+idUsuario);
  }

  deleteProductoCarrito(idUsuario:any,idProducto:any){
    return this.http.delete(this.apiPedidos+"carrito/deleteprod/"+idUsuario+"/"+idProducto);
  }

  addCopia(idPedido:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"carrito/addcopia/"+idPedido+"/"+idProducto, body);
  }

  deleteCopia(idPedido:any,idProducto:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"carrito/deletecopia/"+idPedido+"/"+idProducto, body);
  }

  getImporteCarrito(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"carrito/importe/"+idUsuario);
  }

  compra(idPedido:any):Observable<any>{
    const body = {};
    return this.http.put(this.apiPedidos+"compra/"+idPedido,body);
  }

  getCompras(idUsuario:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/"+idUsuario);
  }

  getDetalleCompra(idPedido:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/detalle/"+idPedido);
  }

  checkFechaDevolucion(idPedido:any):Observable<any>{
    return this.http.get(this.apiPedidos+"compra/fecha/"+idPedido);
  }
}
