<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Función que permite el registro de usuarios
    public function signUp(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|unique:user',
            'password' => 'required|string',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'direccion' => 'required|string'
        ]);

        Usuario::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'direccion' => $request->direccion
        ]);

        return response()->json([
            'message' => 'Usuario creado correctamente.'
        ], 201);
    }

    // Función para el inicio de sesión y la creación de token
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');

        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ]);
    }

    // Función para manejar el cierre de sesión (anular el token)
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    // Función para obtener el objeto Usuario como JSON
    public function user(Request $request)
    {
        return response()->json($request->user());
    }}
