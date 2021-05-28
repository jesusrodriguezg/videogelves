<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Función que devuelve todos los usuarios de la tabla USUARIO
    public function getAllUsuarios()
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
        return response()->json([
            'message' => 'success'
        ]);
    }
}
