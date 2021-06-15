<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*-------- PRODUCTOS --------*/

// Devuelve todos los productos
Route::get('/productos', 'App\Http\Controllers\ProductoController@getAllProductos');
// Devuelve un producto recibiendo como parámetro el nombre del producto
Route::get('/productos/{nombreProducto}', 'App\Http\Controllers\ProductoController@getDetalleProducto');
// Deja el stock de un producto a cero (0)
Route::put('productos/delete/{idProducto}', 'App\Http\Controllers\ProductoController@deleteStockProducto');
// Actualiza uno o varios campos del producto cuyo ID recibe con los datos de un formulario
Route::put('productos/update/{idProducto}', 'App\Http\Controllers\ProductoController@updateProducto');

/*-------- CATEGORÍAS --------*/

// Recibe el ID_CATEGORIA y devuelve el NOMBRE_CATEGORIA correspondiente
Route::get('/categorias/nombre/{idCategoria}', 'App\Http\Controllers\ProductoController@getNombreCategoria');
// Recibe el NOMBRE_CATEGORIA y devuelve todos los productos de dicha categoría
Route::get('/categorias/all/{nombreCategoria}', 'App\Http\Controllers\ProductoController@getProductosCategoria');

/*-------- USUARIOS --------*/

// Devuelve los datos de los usuarios que están logueados
Route::get('/user', 'App\Http\Controllers\UserController@user')->middleware('auth:api');
// Permite el registro de los usuarios
Route::post('/user/register', 'App\Http\Controllers\UserController@registerUser');
// Permite editar los datos de un usuario
Route::put('/user/edit/{idUser}', 'App\Http\Controllers\UserController@updateUser');
// Permite editar la contraseña de un usuario
Route::put('/user/password/{idUser}', 'App\Http\Controllers\UserController@updatePassword');

/*-------- PEDIDOS --------*/

// Crea un pedido nuevo en la tabla PEDIDO
Route::post('/pedidos/{idUsuario}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@createDetallePedido');

/*-------- LISTA DE DESEOS --------*/

// Recibe un ID_USUARIO y devuelve todos los productos de su lista de deseos
Route::get('/listaDeseos/{idUsuario}', 'App\Http\Controllers\ListaDeseosController@getListaDeseos');
// Recibe un ID_USUARIO y un ID_PRODUCTO y lo inserta en la lista de deseos
Route::post('/listaDeseos/add/{idUsuario}/{idProducto}', 'App\Http\Controllers\ListaDeseosController@addListaDeseos');
// Recibe un ID_USUARIO y un ID_PRODUCTO y lo elimina de la lista de deseos
Route::delete('/listaDeseos/delete/{idUsuario}/{idProducto}', 'App\Http\Controllers\ListaDeseosController@deleteListaDeseos');
// Recibe un ID_USUARIO y un ID_PRODUCTO y comprueba si hay una fila en la tabla
Route::get('/listaDeseos/search/{idUsuario}/{idProducto}', 'App\Http\Controllers\ListaDeseosController@searchListaDeseos');

/*-------- VALORACIONES --------*/

// Recibe un ID_USUARIO y un ID_PRODUCTO y crea una nueva fila en la tabla VALORACION
Route::post('/valoraciones/add/{idUsuario}/{idProducto}', 'App\Http\Controllers\ValoracionController@addValoracion');
// Recibe un ID_PRODUCTO y devuelve todas las valoraciones de dicho producto
Route::get('/valoraciones/{idProducto}', 'App\Http\Controllers\ValoracionController@getValoraciones');
// Recibe un ID_PRODUCTO y devuelve el número total de valoraciones para dicho producto
Route::get('/valoraciones/count/{idProducto}', 'App\Http\Controllers\ValoracionController@getValoracionesCount');
// Recibe un ID_PRODUCTO y devuelve la puntuación media de dicho producto
Route::get('/valoraciones/puntuacion/{idProducto}', 'App\Http\Controllers\ValoracionController@getPuntuacion');
// Recibe un ID_USUARIO y un ID_PRODUCTO y devuelve el número de filas en VALORACION con ese filtro
Route::get('/valoraciones/search/{idUsuario}/{idProducto}', 'App\Http\Controllers\ValoracionController@searchValoracion');
