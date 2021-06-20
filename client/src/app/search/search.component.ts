import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public producto = new Producto();
  public productos:Array<Producto> = [];
  public nombreProducto:any = "";

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.nombreProducto = decodeURI(params['search']);
    })
  }

  ngOnInit(): void {
    this.search(this.nombreProducto);
  }

  search(nombreProducto:any){
    this._productoService.search(nombreProducto).subscribe(data => {
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
  }

  verDetalleProducto(nombre_producto:any):void{
    this._router.navigate(['/',encodeURI(nombre_producto)],);
  }
}
