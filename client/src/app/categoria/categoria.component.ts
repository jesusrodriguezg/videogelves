import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {

  public nombreCategoria: any;
  public productos: Array<any> = [];
  public producto = new Producto();

  constructor(private _productoService: ProductoService,
    private _router: Router,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        this.nombreCategoria = decodeURI(params['nombreCategoria']);
      })
  }

  ngOnInit(): void {
    this.getProductosCategoria();
  }

  getProductosCategoria(){
    this._productoService.getProductosCategoria(this.nombreCategoria).subscribe(data => {
      for (let i in data) {
        this.producto = new Producto();
        this.producto.id_producto = data[i].id_producto;
        this.producto.nombre_producto = data[i].nombre_producto;
        this.producto.descripcion = data[i].descripcion;
        this.producto.precio = data[i].precio;
        this.producto.stock = data[i].stock;
        this.producto.imagen = data[i].imagen;
        this.producto.categoria_id_categoria = data[i].categoria_id_categoria;
        this.productos.push(this.producto);
      }
    });
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }

}
