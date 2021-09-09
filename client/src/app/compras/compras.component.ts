import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PedidoService } from '../services/pedido.service';
import { UserService } from '../services/user.service';
import { Pedido } from './pedido';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit, OnDestroy {

  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public pedido = new Pedido();
  public compras:Array<Pedido> = []
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public importe:any = 0;

  constructor(
    private _pedidoService: PedidoService,
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
    this.getCompras(this.user.id_user);
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }

  getCompras(idUsuario:any){
    this._pedidoService.getCompras(idUsuario).subscribe(
      data => {
        for (const d of data) {
        //  this.importe = this.getImporteCompra(d.id_pedido);
          this.pedido = new Pedido();
          this.pedido.id_pedido = d.id_pedido;
          this.pedido.fecha = d.fecha;
          this.pedido.comprado = d.comprado;
          this.pedido.user_id_user = d.user_id_user;
          this.pedido.importetotal = d.importetotal;
          this.compras.push(this.pedido);
        }
        this.dtTrigger.next();
      }
    );
  }

  verDetalleCompra(idPedido:any){
    this._router.navigate(['/compras/detalle/',idPedido]);
  }

  volverAdmin(){
    this._router.navigate(['/secure/']);
  }

}
