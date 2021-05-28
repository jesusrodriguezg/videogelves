<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedido', function (Blueprint $table) {
            $table->smallIncrements('id_pedido')->unique()->nullable(false);
            $table->char('comprado',1)->nullable(false);
            $table->string('fecha',10)->nullable(false);
            $table->unsignedSmallInteger('user_id_user')->nullable(false);

            $table->foreign('user_id_user')->references('id_user')->on('user');

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';
       });
    }

    public function down()
    {
        Schema::dropIfExists('pedido');
    }
}
