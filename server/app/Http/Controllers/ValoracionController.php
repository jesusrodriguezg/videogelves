<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Valoracion;
use Illuminate\Support\Facades\DB;

class ValoracionController extends Controller
{
    // Función que recibe un ID_PRODUCTO y devuelve todas las valoraciones de ese producto
    public function getValoraciones($id_producto)
    {
        return $this->jsonResponse(
            // Realizamos una select con join para extrare el nombre de la tabla USER
            DB::table('valoracion')
                ->where('producto_id_producto',$id_producto)
                ->join('user', 'valoracion.user_id_user', '=', 'user.id_user')
                ->get()
        );
    }

    // Función que crea una nueva fila en la tabla VALORACIONES
    // Recibe un ID_USUARIO y un ID_PRODUCTO y los asigna a la fila
    public function addValoracion(Request $request, $id_usuario, $id_producto)
    {
        // Extraemos los datos de la request
        $comentario = $request->comentario;
        $puntuacion = $request->puntuacion;

        // Comprobamos si en la tabla ya existe alguna fila que contenga
        // una valoración del ID_USUARIO para el ID_PRODUCTO dado
        $fila = ValoracionController::searchValoracion($id_usuario,$id_producto);

        // Si ya existe alguna fila devolvemos un mensaje de error como response
        if ($fila > 0) {
            return response()->json([
                'message' => 'error'
            ]);
        }

        // Si no hay filas, creamos una nueva con los datos
        //de la request y devolvemos un mensaje de éxito
        Valoracion::create([
            'user_id_user' => $id_usuario,
            'producto_id_producto' => $id_producto,
            'comentario' => $comentario,
            'puntuacion' => $puntuacion
        ]);

        // return response()->json([
        //     'message' => 'success'
        // ]);
    }

    // Función que devuelve el número de valoraciones de un producto
    // Recibe un ID_PRODUCTO por parámetros y realiza un count de las filas
    public function getValoracionesCount($id_producto)
    {
        return $this->jsonResponse(
            Valoracion::where('producto_id_producto',$id_producto)
                ->get()->count()
        );
    }

    // Función que devuelve la media de las puntuaciones de un producto
    // Recibe un ID_PRODUCTO y aplica el método avg() para hacer la media
    public function getPuntuacion($id_producto)
    {
        $puntuacion = Valoracion::where('producto_id_producto',$id_producto)
        ->avg('puntuacion');
        return round($puntuacion);
    }

    // Función privada para buscar si existe una valoración en la tabla
    // Recibe un ID_USUARIO y un ID_PRODUCTO y filtra con esos parámetros
    public function searchValoracion($id_usuario,$id_producto)
    {
        return Valoracion::where('user_id_user',$id_usuario)
            ->where('producto_id_producto',$id_producto)
            ->get()->count();
    }
}
