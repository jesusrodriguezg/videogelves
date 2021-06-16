import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../producto';
import { ListadeseosService } from '../services/listadeseos.service';
import { ValoracionService } from '../services/valoracion.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [NgbRatingConfig]
})
export class DetalleComponent implements OnInit {

  public nombreProducto: any = "";
  public producto = new Producto();
  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public id_prod:any;
  public isInLista:any;
  public count:any;
  public puntuacion:any;
  public hasDetallePedido:any;

  constructor(private _productoService:ProductoService,
    private _listaDeseosService: ListadeseosService,
    private _valoracionService: ValoracionService,
    private _pedidoService: PedidoService,
    private activatedRoute:ActivatedRoute,
    private _router: Router,
    private config: NgbRatingConfig) {
      // Instrucción que recoge el nombre del producto de la URL y lo codifica
      // Se guarda en una variable para usarlo en la llamada a la API
      this.activatedRoute.params.subscribe(params => {
        this.nombreProducto = decodeURI(params['nombreProducto']);
      });
      config.max = 5;
      config.readonly = true;
    }

  ngOnInit(): void {
    this.getProductoDetalle();
    //console.log(this.producto.id_producto.trucutru())
  }

  getProductoDetalle() {
    // Pasamos por argumentos al método del servicio el nombre de producto codificado
    this._productoService.getProductoDetalle(this.nombreProducto).subscribe(data => {
      this.producto = data;
      this.searchListaDeseos(this.user.id_user,this.producto.id_producto);
      this.getValoracionesCount(this.producto.id_producto);
      this.getPuntuacion(this.producto.id_producto);
      this.checkDetallePedido(this.user.id_user, this.producto.id_producto);
    });
  }

  /* ----- MÉTODOS DE COMPRA ----- */

  // Función que añade un producto al carrito de la compra
  // Por cada vez que se la llama, hace una llamada a la API, que
  // comprueba / crea una fila en PEDIDO a la vez que crea la fila en DETALLE_PEDIDO
  addCarrito(element:any, idUser:any,idProducto: any){
    this._pedidoService.createDetallePedido(idUser,idProducto)
      .subscribe(data => {
        this.checkDetallePedido(this.user.id_user,this.producto.id_producto);
      });
  }

  checkDetallePedido(idUsuario:any,idProducto:any){
    this._pedidoService.checkDetallePedido(idUsuario,idProducto)
      .subscribe(data => {
        this.hasDetallePedido = data;
      });
  }

  /* ----- MÉTODOS DE LISTA DE DESEOS ----- */

  // Función que añade el producto a la lista de deseos del usuario
  addListaDeseos(idUsuario:any,idProducto: any){
    return this._listaDeseosService.addListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.searchListaDeseos(this.user.id_user,this.producto.id_producto);
      });
  }

  // Función que elimina el producto de la lista de deseos del usuario
  deleteListaDeseos(idUsuario: any,idProducto: any){
    return this._listaDeseosService.deleteListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.searchListaDeseos(this.user.id_user,this.producto.id_producto);
      });
  }

  // Función que comprueba si este producto está en la lista de deseos del usuario
  // Si ya está en la lista, en la vista se muestra "Retirar de la lista de deseos"
  searchListaDeseos(idUsuario: any,idProducto: any){
    return this._listaDeseosService.searchListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.isInLista = data;
      });
  }

  /* ----- MÉTODOS DE VALORACIÓN ----- */

  // Función para recibir el número total de valoraciones del producto
  getValoracionesCount(idProducto:any){
    this._valoracionService.getValoracionesCount(idProducto)
      .subscribe(data => {
        this.count = data;
      });
  }

  // Función para recibir el número medio de las puntuaciones del producto
  getPuntuacion(idProducto:any){
    this._valoracionService.getPuntuacion(idProducto)
      .subscribe(data => {
        this.puntuacion = data;
      });
  }

  /* ----- MÉTODOS GENERALES / AUXILIARES ----- */

  // Método que comprueba si un producto tiene stock o no, para filtrar en la vista
  sinStock(){
    return this.producto.stock == 0;
  }

  // Método que se usa para refrescar la página tras pulsar un botón que genera cambios
  refresh() {
    window.location.reload();
  }
}
