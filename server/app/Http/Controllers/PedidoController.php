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
        // Creamos la fecha de hoy para el update o el create
        $fecha = Carbon::now()->format('d/m/Y');
        // Si hay un pedido sin cerrar para ese usuario, actualiza la fecha;
        // Si no existe ningún pedido sin cerrar, crea uno con la fecha actual
        Pedido::updateOrCreate(
            ['comprado' => 'N','user_id_user' => $id_usuario],
            ['fecha' => $fecha]
        );
        // Devolvemos el ID_PEDIDO de la fila creada o actualizada
        return self::searchPedido($id_usuario);
    }

    // Función que busca en la tabla PEDIDO si hay una fila
    // con el ID_USUARIO dado y con el campo COMPRADO == 'N'
    public static function searchPedido($id_usuario)
    {
        // Devolvemos la colección con la consulta
        return Pedido::where('user_id_user', $id_usuario)
                ->where('comprado','=','N')->get()
                ->pluck('id_pedido')->first();
    }
}
