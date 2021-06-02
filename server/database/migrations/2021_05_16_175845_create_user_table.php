<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            // Para el entero usamos smallIncrement, un INT siempre positivo con valor máx de ~60.000
            // El método increments() hace que dicha columna constituya automáticamente la PK de la tabla
            $table->smallIncrements('id_user')->unique()->nullable(false);
            $table->string('email',50)->nullable(false)->unique();
            $table->string('password',150)->nullable(false);
            $table->string('nombre',25)->nullable(false);
            $table->string('apellidos',50)->nullable(false);
            $table->string('direccion',200)->nullable(false);
            $table->char('admin',1)->nullable(false);
            $table->rememberToken();

            // Añadimos las opciones de la tabla: motor de BD, conjunto de caracteres y cotejamiento
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';
        });
    }

    public function down()
    {
        Schema::dropIfExists('user');
    }
}
