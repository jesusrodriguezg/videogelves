import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../services/productos.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewProductModalComponent } from '../new-product-modal/new-product-modal.component';

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
    private _userService: UserService,
    public matDialog: MatDialog
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

  // Función que permite dejar un producto sin stock
  // El producto no se borra para que los datos no pierdan consistencia
  // Recibe el ID_PRODUCTO que se le pasa a la api para el UPDATE
  deleteStockProducto(idProducto:any){
    this._productoService.deleteStockProducto(idProducto)
    .subscribe(data => {
      this.refresh();
    });
  }

  deleteDialog(idProducto:any){
    this._confirmationDialogService
    .confirmThis("¿Desea eliminar el stock de este producto?",
    () => {
      this.deleteStockProducto(idProducto);
    },
    () => {}
    );
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

  newProductModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "newProducto",
      title: "Nuevo producto",
      description: "Rellena todos los campos para crear un producto nuevo.",
      actionButtonText: "Guardar",
      cancelButtonText: "Cancelar"
    }
    const modalDialog = this.matDialog.open(NewProductModalComponent, dialogConfig);
  }

  editProductModal(idProducto:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "editProducto",
      title: "Editor de productos",
      description: "Rellena los campos que quieras modificar; deja vacíos los que no.",
      actionButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      idProducto: idProducto
    }
    const modalDialog = this.matDialog.open(UpdateProductModalComponent, dialogConfig);
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  volverAdmin(){
    this._router.navigate(['/secure/']);
  }
}
