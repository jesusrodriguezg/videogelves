import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public apiProductos: string = environment.apiUrl + "productos";
  public apiCategorias: string = environment.apiUrl + "categorias";

  constructor(private http: HttpClient) {
  }

  // Método para pedir todos los productos
  getProductos():Observable<any>{
    return this.http.get(this.apiProductos);
  }

  // Método para pedir un producto concreto
  // Recibe por parámetros el ID del producto
  getProductoDetalle(nombreProducto:string):Observable<any>{
    return this.http.get(this.apiProductos+"/"+nombreProducto);
  }

  // Método para pedir todos los productos de una categoría
  // Recibe por parámetros el ID de la categoría
  getProductosCategoria(nombreCategoria:string):Observable<any>{
    return this.http.get(this.apiCategorias+"/all/"+nombreCategoria);
  }

  getNombreCategoria(idCategoria:any):Observable<any>{
    return this.http.get(this.apiCategorias+"/nombre/"+idCategoria);
  }
}
