import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../services/productos.service';
import { Producto } from './producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {

  public productos: Array<any> = [];
  public producto = new Producto();
  public nombre_categoria:string;

  constructor(private _productoService: ProductoService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.getProductos();
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
    });
    console.log(this.productos);
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

  verProductosCategoria(id_categoria:any):void{
    this._productoService.getNombreCategoria(id_categoria).subscribe(data => {
      console.log(data)
      for (let i in data) {
        this.nombre_categoria = data[i].nombre_categoria;
      }
      this._router.navigate(['/categoria/',encodeURI(this.nombre_categoria)],);
    })
  }
}
