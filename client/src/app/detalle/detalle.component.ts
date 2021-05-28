import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { Producto } from '../producto/producto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public nombreProducto: any = "";
  public producto = new Producto();
  public pos: number = 0;

  constructor(private _productoService:ProductoService,
    private activatedRoute:ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        this.nombreProducto = decodeURI(params['nombreProducto']);
        console.log(this.nombreProducto)
      })
    }

  ngOnInit(): void {
    this.getProductoDetalle();
  }

  getProductoDetalle() {
    this._productoService.getProductoDetalle(this.nombreProducto).subscribe(data => {
      console.log(data);
      for (let i in data) {
        this.producto.id_producto = data[i].id_producto;
        this.producto.nombre_producto = data[i].nombre_producto;
        this.producto.descripcion = data[i].descripcion;
        this.producto.precio = data[i].precio;
        this.producto.stock = data[i].stock;
        this.producto.imagen = data[i].imagen;
        this.producto.categoria_id_categoria = data[i].categoria_id_categoria;
      }
    });
  }

  sinStock(){
    return this.producto.stock == 0;
  }
}
