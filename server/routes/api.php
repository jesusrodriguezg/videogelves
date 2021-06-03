<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*-------- PRODUCTOS --------*/

// Devuelve todos los productos
Route::get('/productos', 'App\Http\Controllers\ProductoController@getAllProductos');
// Devuelve un producto recibiendo como parámetro el ID del producto
Route::get('/productos/{nombreProducto}', 'App\Http\Controllers\ProductoController@getDetalleProducto');
// Deja el stock de un producto a cero (0)
Route::put('productos/delete/{idProducto}', 'App\Http\Controllers\ProductoController@deleteStockProducto');

/*-------- CATEGORÍAS --------*/

// Recibe el ID_CATEGORIA y devuelve el NOMBRE_CATEGORIA correspondiente
Route::get('/categorias/nombre/{idCategoria}', 'App\Http\Controllers\ProductoController@getNombreCategoria');
// Recibe el NOMBRE_CATEGORIA y devuelve todos los productos de dicha categoría
Route::get('/categorias/all/{nombreCategoria}', 'App\Http\Controllers\ProductoController@getProductosCategoria');

/*-------- USUARIOS --------*/

// Devuelve los datos de los usuarios que están logueados
Route::get('/user', 'App\Http\Controllers\UserController@user')->middleware('auth:api');
// Permite el registro de los usuarios
Route::post('/register', 'App\Http\Controllers\UserController@registerUser');

/*-------- PEDIDOS --------*/

// Crea un pedido nuevo en la tabla PEDIDO
Route::post('/compra/{idUsuario}', 'App\Http\Controllers\PedidoController@createPedido');
