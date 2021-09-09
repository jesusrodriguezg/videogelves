<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\DetallePedidoController;
use App\Models\Pedido;
use App\Models\User;
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

    public function compra($id_usuario)
    {
        $fecha = Carbon::now()->format('d/m/Y');
        $id_pedido = self::searchPedido($id_usuario);

        $email = User::where('id_user',$id_usuario)->pluck('email')->first();
        $nombre = User::where('id_user',$id_usuario)->pluck('nombre')->first();
        $fecha = Pedido::where('id_pedido',$id_pedido)->pluck('fecha')->first();
        $importe_total = self::getImporteCarrito($id_usuario);
        $detalle = DetallePedidoController::getDetalleCompra($id_pedido);
        // Llamamos al método para enviar el correo de confirmación de compra
        \Mail::send('emails/compra',
                    ['id_pedido' => $id_pedido, 'fecha' => $fecha, 'importe_total' => $importe_total, 'detalle' => $detalle, 'nombre' => $nombre],
                    function($message) use($email){
                        $message->from('','Videogelves');
                        $message->subject('Tu compra en Videogelves');
                        $message->to($email);
                        $message->bcc(''); // opcional
                    }
        );

        return Pedido::where('id_pedido',$id_pedido)
            ->update(['comprado' => 'Y','fecha' => $fecha]);
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

    // Función que devuelve todos los pedidos cerrados de un usuario
    // Devuelve una columna extra con el importe total de la compra
    public function getCompras($id_usuario)
    {
        return DB::select("select pedido.*, sum(cantidad * (select precio from producto where id_producto = detalle_pedido.producto_id_producto)) as 'importetotal' from pedido inner join detalle_pedido on detalle_pedido.devuelto = 'N' and detalle_pedido.pedido_id_pedido = pedido.id_pedido where pedido.user_id_user = :id_usuario and pedido.comprado = 'Y' group by detalle_pedido.pedido_id_pedido;",["id_usuario" => $id_usuario]);
    }

    // Función que calcula y devuelve el importe total de una compra
    // Recibe un ID_USUARIO y combina las tablas DETALLE_PEDIDO y PRODUCTO
    // para devolver la suma del precio total (cantidad * precio) de cada artículo
    public static function getImporteCarrito($id_usuario)
    {
        $id_pedido = self::searchPedido($id_usuario);
        return DB::table("detalle_pedido")->leftJoin("producto", function($join){
            $join->on("detalle_pedido.producto_id_producto", "=", "producto.id_producto");
          })->select(DB::raw("detalle_pedido.cantidad * producto.precio as 'precio total'"))
            ->where("detalle_pedido.pedido_id_pedido", "=", $id_pedido)
            ->sum(DB::raw("detalle_pedido.cantidad * producto.precio"));
    }

    // Función que comprueba si un pedido se puede devolver (si han pasado 15 días desde la venta)
    // Crea tres fechas con Carbon (venta, venta + 15, hoy) y compara las dos últimas
    // Si la fecha de hoy es mayor que la límite, no puede descambiarse; si es menor o igual, sí
    public function checkFechaDevolucion($id_pedido)
    {
        $fecha = Pedido::where('id_pedido',$id_pedido)->pluck('fecha')->first();
        $fecha_venta = Carbon::createFromFormat('d/m/Y',$fecha);
        $fecha_limite = $fecha_venta->addDays(15);
        $hoy = Carbon::now();

        if ($hoy > $fecha_limite) {
            return false;
        }

        return true;
    }
}
