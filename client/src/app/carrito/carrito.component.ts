import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/productos.service';
import { UserService } from '../services/user.service';
import { DetallePedido } from './detallepedido';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {

  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public detallepedido = new DetallePedido();
  public carrito: Array<DetallePedido> = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public importe:number = 0;

  constructor(
    private _pedidoService: PedidoService,
    private _productoService: ProductoService,
    private _userService: UserService,
    private _router:Router
  )
  {
    if (!_userService.isUserLogged()) {
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
        this.detallepedido.cantidad = d.cantidad;
        this.detallepedido.devuelto = d.devuelto;
        this.detallepedido.id_producto = d.id_producto;
        this.detallepedido.nombre_producto = d.nombre_producto;
        this.detallepedido.precio = d.precio;
        this.detallepedido.stock = d.stock;
        this.detallepedido.preciototal = Math.round(d.preciototal  * 100) / 100;
        this.carrito.push(this.detallepedido);
      }
      this.calcularImporteCarrito(this.user.id_user);
      console.log(this.carrito);

      this.dtTrigger.next();
    });
  }

  deleteCarrito(idUsuario:any){
    for (const c of this.carrito) {
      this.addStock(c.id_producto,c.cantidad);
    }
    this._pedidoService.deleteCarrito(idUsuario).subscribe(
      data => {
        this.refresh();
      }
    );
  }

  deleteProductoCarrito(idUsuario:any,idProducto:any,cantidad:any){
    this._pedidoService.deleteProductoCarrito(idUsuario,idProducto)
      .subscribe(data => {
        this.addStock(idProducto,cantidad);
        this.refresh();
      })
  }

  addCopia(idPedido:any,idProducto:any){
    this._pedidoService.addCopia(idPedido,idProducto)
      .subscribe(data => {
        this.removeStock(idProducto);
        this.refresh();
      })
  }

  deleteCopia(idPedido:any,idProducto:any){
    this._pedidoService.deleteCopia(idPedido,idProducto)
      .subscribe(data => {
        this.addStock(idProducto,1);
        this.refresh();
      })
  }

  compra(idUsuario:any){
    this._pedidoService.compra(idUsuario).subscribe(
      data => {
        this.refresh();
      }
    );
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  calcularImporteCarrito(idUsuario:any){
    this._pedidoService.getImporteCarrito(idUsuario).subscribe(data =>{
        this.importe = data;
      });
  }

  // Método que añade una unidad al stock
  addStock(idProducto:any,cantidad:any){
    this._productoService.addStock(idProducto,cantidad).subscribe();
  }

  // Método que quita una unidad del stock cada vez que se añade el producto al carro
  removeStock(idProducto:any){
    this._productoService.removeStock(idProducto).subscribe();
  }

  refresh(){
    window.location.reload();
  }
}
