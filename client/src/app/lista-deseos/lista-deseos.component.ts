import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Producto } from '../producto';
import { ListadeseosService } from '../services/listadeseos.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnDestroy, OnInit {

  public user = JSON.parse(localStorage.getItem('usuario'));
  public producto = new Producto();
  public productos: Array<Producto> = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public hasDetallePedido: any;
  public hasStock:any;


  constructor(
    private _listaDeseosService:ListadeseosService,
    private _pedidoService: PedidoService,
    private _productoService: ProductoService,
    private _router:Router
  )
  {
    if (!this.user) {
      _router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      },
      responsive: true,
      destroy: true
    };
    this.getListaDeseos(this.user.id_user);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListaDeseos(idUsuario:any){
    return this._listaDeseosService.getListaDeseos(idUsuario).subscribe(data => {
      for (let d of data) {
        this.producto = new Producto();
        this.producto.id_producto = d.id_producto;
        this.producto.nombre_producto = d.nombre_producto;
        this.producto.descripcion = d.descripcion;
        this.producto.precio = d.precio;
        this.producto.stock = d.stock;
        this.producto.imagen = d.imagen;
        this.producto.categoria_id_categoria = d.categoria_id_categoria;
        this.productos.push(this.producto);
        this.checkStock(d.id_producto);
      }
      this.dtTrigger.next();
    });
  }

  deleteListaDeseos(idUsuario: any,idProducto: any){
    return this._listaDeseosService.deleteListaDeseos(idUsuario,idProducto)
      .subscribe(data => {
        this.refresh();
      });
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  addCarrito(idUser:any,idProducto: any){
    this._pedidoService.createDetallePedido(idUser,idProducto)
      .subscribe(data => {
        this.removeStock(idProducto);
        this.refresh();
      });
  }

  checkStock(idProducto:any){
    this._productoService.checkStock(idProducto).subscribe(data => {
      this.hasStock = data;
    });
  }

  removeStock(idProducto:any){
    this._productoService.removeStock(idProducto).subscribe();
  }

  // Método que se usa para refrescar la página tras pulsar un botón que genera cambios
  refresh() {
    window.location.reload();
  }
}
