<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PedidoController;
use App\Models\DetallePedido;

class DetallePedidoController extends Controller
{
    public function createDetallePedido($id_usuario,$id_producto)
    {
        // Obtenemos el ID_PEDIDO llamando al método
        // getPedido() de Pedido y pasándole el ID_USUARIO
        $id_pedido = PedidoController::getPedido($id_usuario);

        // Comprobamos si ya hay una fila con ese producto en DETALLE_PRODUCTO
        // Si la hay, actualizamos la CANTIDAD de dicho producto
        // Si no la hay, creamos una nueva fila en DETALLE_PEDIDO
        if (self::searchDetallePedido($id_pedido,$id_producto) > 0) {
            DetallePedido::where('pedido_id_pedido',$id_pedido)
                ->where('producto_id_producto',$id_producto)
                ->update(['cantidad' => DB::raw('cantidad+1')]);
            return response()->json([
                'message' => 'updated'
            ]);
        }else{
            DetallePedido::create([
                'pedido_id_pedido' => $id_pedido,
                'producto_id_producto' => $id_producto,
                'cantidad' => 1,
                'devuelto' => 'N'
            ]);
            return response()->json([
                'message' => 'created'
            ]);
        }
    }

    // Función para buscar si existe ya una fila en DETALLE_PEDIDO
    // con un ID_PEDIDO no completado y un $ID_PRODUCTO dados
    private static function searchDetallePedido($id_pedido,$id_producto)
    {
        return DetallePedido::where('pedido_id_pedido',$id_pedido)
            ->where('producto_id_producto',$id_producto)
            ->get()->count();
    }

    // Función que comprueba si ya existe una fila en DETALLE_PEDIDO
    // con el ID_PRODUCTO y el ID_USUARIO que recibe por parámetros
    public function checkDetallePedido($id_usuario,$id_producto)
    {
        // Comprobamos si existe un ID_PEDIDO sin cerrar en PEDIDO
        // Guardamos el resultado de la query (ID_PEDIDO) en una variable
        $id_pedido = PedidoController::searchPedido($id_usuario);

        // Si la búsqueda no devuelve resultados, devolvemos false
        if($id_pedido == null){
            return false;
        }
        // Si existe un ID_PEDIDO, hacemos una búsqueda en DETALLE_PEDIDO
        return self::searchDetallePedido($id_pedido,$id_producto);
    }

    public function getCarrito($id_usuario)
    {
        $id_pedido = PedidoController::searchPedido($id_usuario);

        return self::getDetalleCompra($id_pedido);
        // return DB::table('detalle_pedido')->where('pedido_id_pedido',$id_pedido)
        //     ->join('producto', 'detalle_pedido.producto_id_producto', '=', 'producto.id_producto')
        //     ->get();
    }

    public function deleteCarrito($id_usuario)
    {
        $id_pedido = PedidoController::searchPedido($id_usuario);
        return DetallePedido::where('pedido_id_pedido', $id_pedido)->delete();
    }

    public function deleteProductoCarrito($id_usuario,$id_producto)
    {
        $id_pedido = PedidoController::searchPedido($id_usuario);
        return DetallePedido::where('pedido_id_pedido', $id_pedido)
            ->where('producto_id_producto',$id_producto)->delete();
    }

    public function addCopia($id_pedido,$id_producto)
    {
        return DetallePedido::where('pedido_id_pedido', $id_pedido)
        ->where('producto_id_producto',$id_producto)
        ->update(['cantidad' => DB::raw('cantidad+1')]);
    }

    public function deleteCopia($id_pedido,$id_producto)
    {
        return DetallePedido::where('pedido_id_pedido', $id_pedido)
        ->where('producto_id_producto',$id_producto)
        ->update(['cantidad' => DB::raw('cantidad-1')]);
    }

    // Función que devuelve los artículos (DETALLE_PEDIDO) de una compra (PEDIDO)
    // Devuelve un campo extra, preciototal, que multiplica cantidad * precio de un producto
    public static function getDetalleCompra($id_pedido)
    {
        return DB::table("detalle_pedido")->leftJoin("producto",function($join){
            $join->on("detalle_pedido.producto_id_producto", "=", "producto.id_producto");
          })->select('pedido_id_pedido','cantidad','devuelto','id_producto','nombre_producto','stock','precio',DB::raw("detalle_pedido.cantidad * producto.precio as 'preciototal'"))
            ->where("detalle_pedido.pedido_id_pedido", "=", $id_pedido)->get();
    }

    public function devolverProducto($id_pedido,$id_producto)
    {
        return DetallePedido::where('pedido_id_pedido',$id_pedido)
            ->where('producto_id_producto',$id_producto)
            ->update(['devuelto' => 'Y']);
    }
}
