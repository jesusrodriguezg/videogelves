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

  getValoraciones(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+idProducto);
  }

  getValoracionesCount(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+"count/"+idProducto);
  }

  getPuntuacion(idProducto:any):Observable<any>{
    return this.http.get(this.apiValoraciones+"puntuacion/"+idProducto);
  }

  addValoracion(idUsuario:any,idProducto:any,formData:any):Observable<any>{
    return this.http.post(this.apiValoraciones+"add/"+idUsuario+"/"+idProducto,formData);
  }
}
