<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;

class PedidoController extends Controller
{
    // Función que crea un pedido nuevo en la tabla PEDIDO
    // Recibe por parámetros el ID_USUARIO del pedido
    // Devuelve el ID_PEDIDO de la compra
    public function createPedido(Request $request)
    {
        $id_usuario = $request->id_usuario;

        // Comprueba si ya hay una fila abierta
        $fila = searchPedido($id_usuario);
        if ($fila->count() > 0) {
            // Si la hay, devolvemos el ID_PEDIDO
            return $fila->pluck('id_pedido')->first();
        }

        // Si no encuentra ninguna fila, la creamos
        // y devolvemos el ID_PEDIDO
        return Pedido::create([
            'comrpado' => 'N',
            'fecha' => 'DD/MM/AAAA',
            'user_id_user' => $id_usuario)
        ])->pluck('id_pedido')->first();
    }

    // Función que busca en la tabla PEDIDO si hay una fila
    // con el ID_USUARIO dado y con el campo COMPRADO == 'N'
    private function searchPedido($id_usuario)
    {
        // Devolvemos la colección con la consulta
        return Pedido::where('user_id_user', $id_usuario)
                ->where('comprado','=','N')->get();
    }
}
