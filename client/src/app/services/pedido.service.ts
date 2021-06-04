import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiPedidos: string =  environment.apiUrl + "pedidos";
  private headers = {'content-type': 'application/json'};

  constructor(private http: HttpClient) { }

  // Método que crea una fila en DETALLE_PEDIDO, o bien actualiza la cantidad de una fila existente
  // Manda un ID_USUARIO con el que comprueba si existe un PEDIDO, para comprobar luego si hay DETALLE_PEDIDO
  // Manda también un ID_PRODUCTO para comprobar si hay DETALLE_PEDIDO y crear / actualizar la fila
  createDetallePedido(idUsuario:any,idProducto:any){
    const body = {};
    return this.http.post(this.apiPedidos+"/"+idUsuario+"/"+idProducto, body, {'headers':this.headers});
  }
}