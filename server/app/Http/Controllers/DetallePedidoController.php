<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pedido;
use App\Models\DetallePedido;

class DetallePedidoController extends Controller
{
    public function createDetallePedido($id_usuario,$id_producto)
    {
        // Obtenemos el ID_PEDIDO llamando al método
        // getPedido() de Pedido y pasándole el ID_USUARIO
        $id_pedido = Pedido::getPedido($id_usuario);

        // Comprobamos si ya hay una fila con ese producto en DETALLE_PRODUCTO
        // Si la hay, actualizamos la CANTIDAD de dicho producto
        // Si no la hay, creamos una nueva fila en DETALLE_PEDIDO
        if (searchDetallePedido($id_pedido,$id_producto) > 0) {
            return DetallePedido::where('id_pedido',$id_pedido)
                ->where('id_producto',$id_producto)
                ->update(['cantidad' => DB::raw('cantidad+1')]);
        }else{
            DetallePedido::create([
                'pedido_id_pedido' => $id_pedido,
                'producto_id_producto' => $id_producto),
                'cantidad' => ,
                'devuelto' => 'N'
            ]);
            return response()->json([
                'message' => 'success'
            ]);
        }
    }

    // Función para buscar si existe ya una fila en DETALLE_PEDIDO
    // con un ID_PEDIDO no completado y un $ID_PRODUCTO dados
    private function searchDetallePedido($id_pedido,$id_producto)
    {
        return DetallePedido::where('id_pedido',$id_pedido)
            ->where('id_producto',$id_producto)
            ->get()->count();
    }
}
