<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert([
            'email' => 'sanedu@gmail.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'nombre' => 'Jesús',
            'apellidos' => 'Rodríguez González',
            'direccion' => 'Esclava del Señor 1',
            'admin' => 'Y'
        ]);

        DB::table('user')->insert([
            'email' => 'alexesre@gmail.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'nombre' => 'Álex',
            'apellidos' => 'Escobar Restrepo',
            'direccion' => 'Calle Falsa 123',
            'admin' => 'N'
        ]);
    }
}
