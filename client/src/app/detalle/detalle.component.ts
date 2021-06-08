import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ListadeseosService } from '../services/listadeseos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public nombreProducto: any = "";
  public producto = new Producto();
  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public id_prod:any;
  public count:any;

  constructor(private _productoService:ProductoService,
    private _listaDeseosService: ListadeseosService,
    private activatedRoute:ActivatedRoute,
    private _router: Router) {
      // Instrucción que recoge el nombre del producto de la URL y lo codifica
      // Se guarda en una variable para usarlo en la llamada a la API
      this.activatedRoute.params.subscribe(params => {
        this.nombreProducto = decodeURI(params['nombreProducto']);
      })
      this.id_prod = this.producto.id_producto;
    }

  ngOnInit(): void {
    this.getProductoDetalle();
    console.log(encodeURI(this._router.url))
    console.log(this._router.url)
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
        this.id_prod = data[i].id_producto;
      }
      this.searchListaDeseos(this.user.id_user,this.id_prod);
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
        this.count = data;
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
