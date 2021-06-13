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
  private headers = {'content-type': 'application/json'};

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

  // Método que sirve para "convertir" el ID en el NOMBRE_CATEGORIA
  // Manda un ID_CATEGORIA y recibe el NOMBRE_CATEGORIA correspondiente
  getNombreCategoria(idCategoria:any):Observable<any>{
    return this.http.get(this.apiCategorias+"/nombre/"+idCategoria);
  }

  //
  deleteStockProducto(idProducto:any):Observable<any>{
    const body = { stock: 0 };
    return this.http.put(this.apiProductos+'/delete/'+idProducto,body,{'headers':this.headers});
  }

  updateProducto(idProducto:any,formData:any):Observable<any>{
    const body = formData;
    return this.http.put(this.apiProductos+'/update/'+idProducto,body,{'headers':this.headers});
  }
}
