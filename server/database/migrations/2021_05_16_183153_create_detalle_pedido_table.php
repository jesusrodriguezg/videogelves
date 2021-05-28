<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallePedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_pedido', function (Blueprint $table) {
            $table->unsignedSmallInteger('pedido_id_pedido')->nullable(false);
            $table->unsignedSmallInteger('producto_id_producto')->nullable(false);
            $table->unsignedTinyInteger('cantidad')->nullable(false);
            $table->char('devuelto',1)->nullable(false);

            $table->foreign('pedido_id_pedido')->references('id_pedido')->on('pedido');
            $table->foreign('producto_id_producto')->references('id_producto')->on('producto');

            // Creamos la clave primaria compuesta
            $table->primary(['pedido_id_pedido', 'producto_id_producto']);

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';
       });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_pedido');
    }
}
