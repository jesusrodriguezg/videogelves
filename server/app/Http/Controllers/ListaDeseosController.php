<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListaDeseos;
use App\Models\Producto;

class ListaDeseosController extends Controller
{
    // Función que devuelve los productos de la lista de deseos
    // del ID_USUARIO que recibe por parámetros
    public function getListaDeseos($id_usuario)
    {
        $id_prod = ListaDeseos::where('user_id_user',$id_usuario)->get()->pluck('producto_id_producto');
        $productos = Producto::all()->whereIn('id_producto',$id_prod);
        $return = [];
        foreach ($productos as $key => $value) {
            array_push($return, $value);
        }

        return $this->jsonResponse($return);
    }

    // Función que crea una fila en la lista de deseos
    // Busca por el ID_USUARIO y el ID_PRODUCTO que recibe
    // y crea la fila en la tabla de LISTA_DESEOS
    public function addListaDeseos($id_usuario,$id_producto)
    {
        return ListaDeseos::create([
            'user_id_user' => $id_usuario,
            'producto_id_producto' => $id_producto
        ]);
    }

    // Función que elimina una fila de la lista de deseos
    // Busca por el ID_USUARIO y el ID_PRODUCTO que recibe
    // y elimina la fila de la tabla de LISTA_DESEOS
    public function deleteListaDeseos($id_usuario,$id_producto)
    {
        return ListaDeseos::where('user_id_user',$id_usuario)
            ->where('producto_id_producto',$id_producto)
            ->delete();
    }

    // Función que busca si un usuario tiene un producto en su lista de deseos
    // El modificador es public porque se llama directamente desde el cliente
    public function searchListaDeseos($id_usuario,$id_producto){
        return ListaDeseos::where('user_id_user',$id_usuario)
            ->where('producto_id_producto',$id_producto)
            ->get()->count();
    }

}
