<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListaDeseos;

class ListaDeseosController extends Controller
{
    // Función que devuelve los productos de la lista de deseos
    // del ID_USUARIO que recibe por parámetros
    public function getListaDeseos($id_usuario)
    {
        return $this->jsonResponse(ListaDeseos::where('user_id_user',$id_usuario)->get());
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

        return response()->json([
            'message' => 'success'
        ]);
    }

    // Función que elimina una fila de la lista de deseos
    // Busca por el ID_USUARIO y el ID_PRODUCTO que recibe
    // y elimina la fila de la tabla de LISTA_DESEOS
    public function deleteListaDeseos($id_usuario,$id_producto)
    {

    }


}
