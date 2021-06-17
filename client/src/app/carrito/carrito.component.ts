import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PedidoService } from '../services/pedido.service';
import { DetallePedido } from './detallepedido';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public detallepedido = new DetallePedido();
  public carrito: Array<DetallePedido> = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _pedidoService: PedidoService,
    private _router:Router
  ) { }

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
    this.getCarrito(this.user.id_user);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getCarrito(idUsuario:any){
    this._pedidoService.getCarrito(idUsuario).subscribe(data =>{
        for (const d of data) {
          this.detallepedido = new DetallePedido();
          this.detallepedido.pedido_id_pedido = d.pedido_id_pedido;
          this.detallepedido.producto_id_producto = d.producto_id_producto;
          this.detallepedido.cantidad = d.cantidad;
          this.detallepedido.devuelto = d.devuelto;
          this.detallepedido.id_producto = d.id_producto;
          this.detallepedido.nombre_producto = d.nombre_producto;
          this.detallepedido.descripcion = d.descripcion;
          this.detallepedido.precio = d.precio;
          this.detallepedido.stock = d.stock;
          this.detallepedido.imagen = d.imagen;
          this.detallepedido.categoria_id_categoria = d.categoria_id_categoria;
          this.detallepedido.precioTotal = Math.round((this.detallepedido.precio * this.detallepedido.cantidad) * 100) / 100;
          this.carrito.push(this.detallepedido);
        }
        this.dtTrigger.next();
      }
    )
  }

  deleteCarrito(idUsuario:any){
    this._pedidoService.deleteCarrito(idUsuario).subscribe(
      data => {
        this.refresh();
      }
    );
  }

  deleteProductoCarrito(idUsuario:any,idProducto:any){
    this._pedidoService.deleteProductoCarrito(idUsuario,idProducto)
      .subscribe(data => {
        this.refresh();
      })
  }

  addCopia(idPedido:any,idProducto:any){
    this._pedidoService.addCopia(idPedido,idProducto)
      .subscribe(data => {
        this.refresh();
      })
  }

  deleteCopia(idPedido:any,idProducto:any){
    this._pedidoService.deleteCopia(idPedido,idProducto)
      .subscribe(data => {
        this.refresh();
      })
  }

  confirmarCompra(){

  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  refresh(){
    window.location.reload();
  }
}
