import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public producto = new Producto();
  public productos: Array<Producto> = [];

  constructor(
    private _productoService:ProductoService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this._productoService.getProductos().subscribe(
      data => {
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
       }
    );
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }
}
