<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->smallIncrements('id_producto')->unique()->nullable(false);
            $table->string('nombre_producto',50)->nullable(false);
            $table->string('descripcion',500)->nullable(false);
            $table->decimal('precio',6,2)->nullable(false);
            $table->unsignedTinyInteger('stock')->nullable(false);
            $table->string('imagen',100)->nullable(false);
            $table->unsignedSmallInteger('categoria_id_categoria')->nullable(false);

            // Creamos las claves foráneas con referencias
            $table->foreign('categoria_id_categoria')->references('id_categoria')->on('categoria');

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';
        });
    }

    public function down()
    {
        Schema::dropIfExists('producto');
    }
}
