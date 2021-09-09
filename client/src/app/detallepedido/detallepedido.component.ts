import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DetallePedido } from '../carrito/detallepedido';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/productos.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.component.html',
  styleUrls: ['./detallepedido.component.css']
})
export class DetallepedidoComponent implements OnInit, OnDestroy {

  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public idPedido:any;
  public detallepedido = new DetallePedido();
  public compra:Array<DetallePedido> = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public importe:number = 0;
  public esDescambiable:any;

  constructor(
    private _pedidoService: PedidoService,
    private _productoService: ProductoService,
    private _userService: UserService,
    private _router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    if (!_userService.isUserLogged()) {
      _router.navigate(['/login']);
    }
    this.activatedRoute.params.subscribe(params => {
      this.idPedido = decodeURI(params['idPedido']);
    });
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

    this.getDetalleCompra(this.idPedido);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getDetalleCompra(idPedido:any){
    this._pedidoService.getDetalleCompra(idPedido).subscribe(data =>{
      for (const d of data) {
        this.detallepedido = new DetallePedido();
        this.detallepedido.pedido_id_pedido = d.pedido_id_pedido;
        this.detallepedido.cantidad = d.cantidad;
        this.detallepedido.devuelto = d.devuelto;
        this.detallepedido.id_producto = d.id_producto;
        this.detallepedido.nombre_producto = d.nombre_producto;
        this.detallepedido.precio = d.precio;
        this.detallepedido.stock = d.stock;
        this.detallepedido.preciototal = d.preciototal;
        this.compra.push(this.detallepedido);
      }
      this.dtTrigger.next();
      this.checkFechaDevolucion(this.idPedido);
      console.log(this.esDescambiable);

    });
  }

  devolverProducto(idPedido:any,idProducto:any,cantidad:any){
    this._pedidoService.devolverProducto(idPedido,idProducto).subscribe(data => {
      this.addStock(idProducto,cantidad);
      this.refresh();
    });
  }

  checkFechaDevolucion(idPedido:any){
    this._pedidoService.checkFechaDevolucion(idPedido).subscribe( data => {
      this.esDescambiable = data;
    });
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  volverHistorialCompras():void{
    this._router.navigate(['/compras']);
  }

  // Método que añade una o varias unidades al stock
  addStock(idProducto:any,cantidad:any){
    this._productoService.addStock(idProducto,cantidad).subscribe();
  }

  refresh(){
    window.location.reload();
  }
}
