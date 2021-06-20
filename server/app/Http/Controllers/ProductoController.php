<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    // Función que muestra todos los productos de la tabla PRODUCTO
    public function getAllProductos(){
        return $this->jsonResponse(Producto::all());
    }

    // Función que recibe un NOMBRE_PRODUCTO y devuelve los datos de ese producto
    public function getDetalleProducto($nombre_producto){
        return $this->jsonResponse(Producto::where('nombre_producto',$nombre_producto)->first());
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

    public function deleteStockProducto($id_producto)
    {
        return Producto::find($id_producto)->update(['stock' => 0]);
    }

    public function checkStock($id_producto)
    {
        return Producto::where('id_producto',$id_producto)
                ->pluck('stock')->first();
    }

    public function addStock($id_producto,$cantidad)
    {
        return Producto::where('id_producto',$id_producto)
            ->increment('stock',$cantidad);
    }

    public function removeStock($id_producto)
    {
        return Producto::where('id_producto',$id_producto)
            ->update(['stock' => DB::raw('stock-1')]);
    }

    // Función que actualiza un producto con los datos de un formulario
    public function updateProducto($id_producto, Request $request){
        // Filtra los campos del formulario que vienen vacíos y deja los rellenos
        $validated = array_filter($request->all());
        // Al pasarle el mapa filtrado sólo actualiza las columnas que tienen valor
        return Producto::find($id_producto)->update($validated);
    }

    public function search($nombre_producto)
    {
        return Producto::where('nombre_producto', 'like', '%'.$nombre_producto.'%')->get();
    }

    public function createProducto(Request $request)
    {
        Producto::create([
            'nombre_producto' => $request->nombre_producto,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'imagen' => $request->imagen,
            'categoria_id_categoria' => $request->categoria_id_categoria
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }
}
