<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*-------- USUARIOS --------*/

// Devuelve los datos de los usuarios que están logueados
Route::get('/user', 'App\Http\Controllers\UserController@user')->middleware('auth:api');
// Permite el registro de los usuarios
Route::post('/user/register', 'App\Http\Controllers\UserController@registerUser');
// Devuelve los datos de todos los usuarios
Route::get('/user/all', 'App\Http\Controllers\UserController@getAllUsers');
// Permite editar los datos de un usuario
Route::put('/user/edit/{idUser}', 'App\Http\Controllers\UserController@updateUser');
// Permite editar la contraseña de un usuario
Route::put('/user/password/{idUser}', 'App\Http\Controllers\UserController@updatePassword');

/*-------- CATEGORÍAS --------*/

// Recibe el ID_CATEGORIA y devuelve el NOMBRE_CATEGORIA correspondiente
Route::get('/categorias/nombre/{idCategoria}', 'App\Http\Controllers\ProductoController@getNombreCategoria');
// Recibe el NOMBRE_CATEGORIA y devuelve todos los productos de dicha categoría
Route::get('/categorias/all/{nombreCategoria}', 'App\Http\Controllers\ProductoController@getProductosCategoria');

/*-------- PRODUCTOS --------*/

// Devuelve todos los productos
Route::get('/productos', 'App\Http\Controllers\ProductoController@getAllProductos');
// Devuelve un producto recibiendo como parámetro el nombre del producto
Route::get('/productos/{nombreProducto}', 'App\Http\Controllers\ProductoController@getDetalleProducto');
// Deja el stock de un producto a cero (0)
Route::put('/productos/delete/{idProducto}', 'App\Http\Controllers\ProductoController@deleteStockProducto');
// Actualiza uno o varios campos del producto cuyo ID recibe con los datos de un formulario
Route::post('/productos/create/', 'App\Http\Controllers\ProductoController@createProducto');
// Actualiza uno o varios campos del producto cuyo ID recibe con los datos de un formulario
Route::put('/productos/update/{idProducto}', 'App\Http\Controllers\ProductoController@updateProducto');
// Comprueba si un producto tiene stock
Route::get('/productos/stock/check/{idProducto}', 'App\Http\Controllers\ProductoController@checkStock');
// Comprueba si un producto tiene stock
Route::put('/productos/stock/add/{idProducto}/{cantidad}', 'App\Http\Controllers\ProductoController@addStock');
// Comprueba si un producto tiene stock
Route::put('/productos/stock/remove/{idProducto}', 'App\Http\Controllers\ProductoController@removeStock');
// Devuelve los resultados de la barra de búsqueda de la web
Route::get('/productos/search/{nombreProducto}', 'App\Http\Controllers\ProductoController@search');

/*-------- PEDIDOS --------*/

// Crea un pedido nuevo en la tabla DETALLE_PEDIDO
Route::post('/pedidos/add/{idUsuario}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@createDetallePedido');
// Comprueba si un ID_USER tiene ya una fila con un ID_PRODUCTO dado en DETALLE_PEDIDO
Route::get('/pedidos/check/{idUsuario}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@checkDetallePedido');
// Devuelve todos los productos del carrito (en DETALLE_PEDIDO y con un ID_PEDIDO que no está cerrado)
Route::get('/pedidos/carrito/{idUsuario}', 'App\Http\Controllers\DetallePedidoController@getCarrito');
// Quita todos los productos del carrito (borra todas las filas de DETALLE_PEDIDO con ID_PEDIDO no cerrado)
Route::delete('/pedidos/carrito/delete/{idUsuario}', 'App\Http\Controllers\DetallePedidoController@deleteCarrito');
// Quita un productos del carrito (borra la fila completa de DETALLE_PEDIDO)
Route::delete('/pedidos/carrito/deleteprod/{idUsuario}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@deleteProductoCarrito');
// Suma una copia de un producto que ya está en el carrito
Route::put('/pedidos/carrito/addcopia/{idPedido}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@addCopia');
// Quita una copia de un producto que ya está en el carrito
Route::put('/pedidos/carrito/deletecopia/{idPedido}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@deleteCopia');
// Devuelve el importe total de una compra cuando se encuentra en el carrito (sin cerrar)
Route::get('/pedidos/carrito/importe/{idUsuario}', 'App\Http\Controllers\PedidoController@getImporteCarrito');
// Confirma la compra de los productos del carrito (cierra el PEDIDO con el ID_PEDIDO)
Route::put('/pedidos/compra/{idUsuario}', 'App\Http\Controllers\PedidoController@compra');
// Devuelve todos los pedidos cerrados de un usuario
Route::get('/pedidos/compra/all/{idUsuario}', 'App\Http\Controllers\PedidoController@getCompras');
// Devuelve las filas de DETALLE_PEDIDO correspondientes a un PEDIDO cerrado concreto
Route::get('/pedidos/compra/detalle/{idPedido}', 'App\Http\Controllers\DetallePedidoController@getDetalleCompra');
// Comprueba si los artículos de un pedido se pueden devolver (si han pasado +15 días desde que se cerró)
Route::get('/pedidos/compra/fecha/{idPedido}', 'App\Http\Controllers\PedidoController@checkFechaDevolucion');
// Comprueba si los artículos de un pedido se pueden devolver (si han pasado +15 días desde que se cerró)
Route::put('/pedidos/compra/devolver/{idPedido}/{idProducto}', 'App\Http\Controllers\DetallePedidoController@devolverProducto');

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
