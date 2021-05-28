<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*-------- PRODUCTOS --------*/

// Devuelve todos los productos
Route::get('/productos', 'App\Http\Controllers\ProductoController@getAllProductos');
// Devuelve un producto recibiendo como parámetro el ID del producto
Route::get('/productos/{nombreProducto}', 'App\Http\Controllers\ProductoController@getDetalleProducto');

/*-------- CATEGORÍAS --------*/
Route::get('/categorias/all/{nombreCategoria}', 'App\Http\Controllers\ProductoController@getProductosCategoria');
Route::get('/categorias/nombre/{idCategoria}', 'App\Http\Controllers\ProductoController@getNombreCategoria');

/*-------- USUARIOS --------*/

// Devuelve los datos de los usuarios que están logueados
Route::get('/user', 'App\Http\Controllers\UserController@user')->middleware('auth:api');
// Permite el registro de los usuarios
Route::post('/register', 'App\Http\Controllers\UserController@registerUser');
