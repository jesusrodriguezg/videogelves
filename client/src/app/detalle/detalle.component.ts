import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../producto';
import { ListadeseosService } from '../services/listadeseos.service';
import { ValoracionService } from '../services/valoracion.service';

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

  constructor(private _productoService:ProductoService,
    private _listaDeseosService: ListadeseosService,
    private _valoracionService: ValoracionService,
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
    console.log(this.producto.id_producto.trucutru())
  }

  getProductoDetalle() {
    // Pasamos por argumentos al método del servicio el nombre de producto codificado
    this._productoService.getProductoDetalle(this.nombreProducto).subscribe(data => {
      for (let i in data) {
        this.producto.id_producto = data[i].id_producto;
        this.producto.nombre_producto = data[i].nombre_producto;
        this.producto.descripcion = data[i].descripcion;
        this.producto.precio = data[i].precio;
        this.producto.stock = data[i].stock;
        this.producto.imagen = data[i].imagen;
        this.producto.categoria_id_categoria = data[i].categoria_id_categoria;

      }
      this.searchListaDeseos(this.user.id_user,this.producto.id_producto);
      this.getValoracionesCount(this.producto.id_producto);
      this.getPuntuacion(this.producto.id_producto);
      });
  }

  /* ----- MÉTODOS DE COMPRA ----- */

  // Función que añade un producto al carrito de la compra
  // Por cada vez que se la llama, hace una llamada a la API, que
  // comprueba / crea una fila en PEDIDO a la vez que crea la fila en DETALLE_PEDIDO
  addCarrito(idProducto: any){

  }

  /* ----- MÉTODOS DE LISTA DE DESEOS ----- */

  addListaDeseos(idUsuario:any,idProducto: any){
    return this._listaDeseosService.addListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.refresh();
      });
  }

  //
  deleteListaDeseos(idUsuario: any,idProducto: any){
    return this._listaDeseosService.deleteListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.refresh();
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
    let currentUrl = decodeURI(this._router.url);
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
  }
}
