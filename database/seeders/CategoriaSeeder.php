<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria')->insert([
            'nombre_categoria' => 'Nintendo Switch',
            'descripcion_categoria' => 'Juegos de Nintendo Switch'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Playstation 5',
            'descripcion_categoria' => 'Juegos de PlayStation 5'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Xbox Series X|S',
            'descripcion_categoria' => 'Juegos de Xbox Series X|S'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Playstation 4',
            'descripcion_categoria' => 'Juegos de Playstation 4'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Xbox One',
            'descripcion_categoria' => 'Juegos de Xbox One'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Playstation 3',
            'descripcion_categoria' => 'Juegos de Playstation 3'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Xbox 360',
            'descripcion_categoria' => 'Juegos de Xbox 360'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Nintendo 3DS | 2DS',
            'descripcion_categoria' => 'Juegos de Nintendo 3DS y Nintendo 2DS'
        ]);

        DB::table('categoria')->insert([
            'nombre_categoria' => 'Wii U',
            'descripcion_categoria' => 'Juegos de Nintendo Wii U'
        ]);
    }
}
