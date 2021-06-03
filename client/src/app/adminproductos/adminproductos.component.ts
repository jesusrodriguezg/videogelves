import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../services/productos.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrls: ['./adminproductos.component.css']
})
export class AdminproductosComponent implements OnDestroy, OnInit {

  public productos: Array<Producto> = [];
  public producto = new Producto();
  public nombre_categoria:string;
  public message = "";
  public dtOptions: DataTables.Settings = {};
  //El trigger se usa para que los datos se carguen antes de renderizar
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _productoService: ProductoService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _router:Router,
    private _userService: UserService
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
      }
    };
    this.getProductos();
  }

  ngOnDestroy(): void {
    // Desuscribimos el evento al terminar de cargar los datos y la página
    this.dtTrigger.unsubscribe();
  }

  getProductos(){
    this._productoService.getProductos().subscribe(data => {
      for (const d of data) {
        this.producto = new Producto();
        this.producto.id_producto = d.id_producto;
        this.producto.nombre_producto = d.nombre_producto;
        this.producto.descripcion = d.descripcion;
        this.producto.precio = d.precio;
        this.producto.stock = d.stock;
        this.producto.imagen = d.imagen;
        this.producto.categoria_id_categoria = d.categoria_id_categoria;
        this.productos.push(this.producto);
      }
      this.dtTrigger.next();
    });
  }

  // Función que redirige a la pantalla para editar el producto
  // Recibe por parámetros el ID_PRODUCTO que se le pasa a la api para el UPDATE
  editProducto(idProducto){

  }

  // Función que permite dejar un producto sin stock
  // El producto no se borra para que los datos no pierdan consistencia
  // Recibe el ID_PRODUCTO que se le pasa a la api para el UPDATE
  deleteStockProducto(idProducto){
    this._productoService.deleteStockProducto(idProducto)
      .subscribe(data => {
        this.refresh();
      });
  }

  deleteDialog(idProducto){
    this._confirmationDialogService
    .confirmThis("¿Desea eliminar el stock de este producto?",
      () => {
        this.deleteStockProducto(idProducto);
      },
      () => {}
    );
  }

  updateDialog(idProducto){
    this._productoService.updateProducto(idProducto)
      .subscribe(data => {

      })
  }

  refresh() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
  }

  isUserLogged(){
    return localStorage.getItem('usuario');
  }
}
