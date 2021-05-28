<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // Función que muestra todos los productos de la tabla PRODUCTO
    public function getAllProductos(){
        return $this->jsonResponse(Producto::all());
    }

    // Función que recibe un NOMBRE_PRODUCTO y devuelve los datos de ese producto
    public function getDetalleProducto($nombreProducto){
        return $this->jsonResponse(Producto::all()->where('nombre_producto',$nombreProducto));
    }

    // Función que recibe un NOMBRE_CATEGORIA y devuelve los productos de esa categoría
    public function getProductosCategoria($nombre_categoria){
        return $this->jsonResponse(Producto::all()
                    ->where('categoria_id_categoria', Categoria::where('nombre_categoria',$nombre_categoria)
                    ->pluck('id_categoria')->first()));
    }

    // Función que devuelve el nombre de una categoria en función de un ID_CATEGORIA recibido por parámetros
    public function getNombreCategoria($id_categoria)
    {
        return $this->jsonResponse(Categoria::all()
                    ->where('id_categoria',$id_categoria));
    }
}
