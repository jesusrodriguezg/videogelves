<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mail;

class UserController extends Controller
{
    // Función que devuelve todas las filas de la tabla USER
    public function getAllUsers()
    {
        return $this->jsonResponse(User::all());
    }

    // Función para la visualización de usuarios autenticados
    public function user(Request $request)
    {
        return $request->user();
    }

    public function registerUser(Request $request)
    {
        User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'conf_password' => Hash::make($request->conf_password),
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'direccion' => $request->direccion,
            'admin' => 'N',
        ]);

        $email = $request->email;
        // Llamamos al método para enviar el correo de confirmación
        \Mail::send('emails/register',['data' => $request], function($message) use($email){
            $message->from('example@gmail.com','Videogelves');
            $message->subject('¡Registro completado!');
            $message->to('example@gmail.com');
            $message->to($email);
        });

        return response()->json([
            'message' => 'success'
        ]);
    }

    public function updateUser($id_user,Request $request)
    {
        // Filtra los campos del formulario que vienen vacíos y deja los rellenos
        $validated = array_filter($request->all());
        // Al pasarle el mapa filtrado sólo actualiza las columnas que tienen valor
        return User::find($id_user)->update($validated);
    }

    public function updatePassword($id_user, Request $request)
    {
        // Guardamos los datos en dos variables y las encriptamos
        $password = Hash::make($request->password);
        $conf_password = Hash::make($request->conf_password);

        // Comprobamos que la contraseña y la confirmación coinciden
        // Si coinciden, se actualiza; si no, manda un mensaje de error
        if ($password === $conf_password) {
            User::find($id_user)->update(['password' => $password]);
            return response()->json([
                'message' => 'success'
            ]);
        }else{
            return response()->json([
                'message' => 'error'
            ]);
        }
    }
}
