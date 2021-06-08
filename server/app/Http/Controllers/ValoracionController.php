<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Valoracion;

class ValoracionController extends Controller
{
    // Función que recibe un ID_PRODUCTO y devuelve todas las valoraciones de ese producto
    public function getValoraciones($id_producto)
    {
        return $this->jsonResponse(Valoracion::where('producto_id_producto', $id_producto)->get());
    }

    // Función que crea una nueva fila en la tabla VALORACIONES
    // Recibe un ID_USUARIO y un ID_PRODUCTO y los asigna a la fila
    public function addValoracion(Request $request)
    {
        // Extraemos los datos de la request
        $id_usuario = $request->id_usuario;
        $id_producto = $request->id_producto;
        $comentario = $request->comentario;
        $puntuacion = $request->puntuacion;

        // Comprobamos si en la tabla ya existe alguna fila que contenga
        // una valoración del ID_USUARIO para el ID_PRODUCTO dado
        $fila = searchValoracion($id_usuario,$id_producto);

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

        return response()->json([
            'message' => 'success'
        ]);
    }

    // Función privada para buscar si existe una valoración en la tabla
    // Recibe un ID_USUARIO y un ID_PRODUCTO y filtra con esos parámetros
    private function searchValoracion($id_usuario,$id_producto)
    {
        return Valoracion::where('user_id_user',$id_usuario)
            ->where('producto_id_producto',$id_producto)
            ->get()->count();
    }
}
