<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use Carbon\Carbon;

class PedidoController extends Controller
{
    // Función que crea un pedido nuevo en la tabla PEDIDO
    // Recibe por parámetros el ID_USUARIO del pedido
    // Devuelve el ID_PEDIDO de la compra
    public static function getPedido($id_usuario)
    {
        // $id_usuario = $request->id_usuario;

        // Comprueba si ya hay una fila abierta
        $fila = self::searchPedido($id_usuario);
        if ($fila->count() > 0) {
            // Si la hay, devolvemos el ID_PEDIDO
            return $fila->pluck('id_pedido')->first();
        }

        // Si no encuentra ninguna fila, la creamos
        // llamando a createPedido() y cogemos el ID_PEDIDO
        return self::createPedido($id_usuario);
    }

    // Función que crea una fila nueva en la tabla PEDIDO
    // Recibe un ID_USUARIO y devuelve el ID_PEDIDO
    private static function createPedido($id_usuario)
    {
        // Se crea una fecha y le damos el formato DD/MM/YYYY
        $fecha = Carbon::now()->format('d/m/Y');
        // Crea la fila y devuelve el ID_PEDIDO de la última fila
        return Pedido::create([
            'comprado' => 'N',
            'fecha' => $fecha,
            'user_id_user' => $id_usuario
        ])->pluck('id_pedido')->last();
    }

    // Función que busca en la tabla PEDIDO si hay una fila
    // con el ID_USUARIO dado y con el campo COMPRADO == 'N'
    public static function searchPedido($id_usuario)
    {
        // Devolvemos la colección con la consulta
        return Pedido::where('user_id_user', $id_usuario)
                ->where('comprado','=','N')->get();
    }

    public static function getIdPedido($id_usuario)
    {
        // Devolvemos el id_pedido con el ID_USER seleccionado
        return Pedido::where('user_id_user', $id_usuario)
                ->where('comprado','=','N')
                ->get()->pluck('id_pedido');
    }
}
