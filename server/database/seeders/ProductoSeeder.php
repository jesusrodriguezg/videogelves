<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  NINTENDO SWITCH

        DB::table('producto')->insert([
            'nombre_producto' => 'Bravely Default II',
            'descripcion' => 'Square Enix llena de fantasía y magia tu Nintendo Switch con la tercera entrega de la saga Bravely Default. Una trama completamente nueva, personajes inolvidables, un mundo enorme y unos gráficos deslumbrantes te esperan en la mayor historia para tu Switch.',
            'precio' => 59.95,
            'stock' => 75,
            'imagen' => '../assets/images/bravely-default-portada.png',
            'categoria_id_categoria' => 1
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'New Pokémon Snap',
            'descripcion' => 'Prepárate para New Pokémon Snap, una aventura totalmente nueva inspirada en Pokémon Snap, el clásico juego de Nintendo 64. Los jugadores podrán convertirse en auténticos fotógrafos Pokémon gracias a New Pokémon Snap, que llegará en exclusiva para consolas Nintendo Switch.',
            'precio' => 59.95,
            'stock' => 45,
            'imagen' => '../assets/images/new-pokemon-snap-portada.png',
            'categoria_id_categoria' => 1
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Super Mario 3D World + Bowser´s Fury',
            'descripcion' => '¡Únete a Mario, Luigi, la princesa Peach y Toad en una aventura para salvar el Reino de las hadas en Super Mario 3D World + Bowser’s Fury para Nintendo Switch! Bowser ha secuestrado a la princesa hada… ¡y solo nuestros héroes podrán rescatarla!',
            'precio' => 49.95,
            'stock' => 63,
            'imagen' => '../assets/images/super-mario-3d-world-bowsers-fury-portada.png',
            'categoria_id_categoria' => 1
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'The Legend of Zelda Skyward Sword HD',
            'descripcion' => 'Vuelve una de las aventuras originales más queridas ambientada al principio de la cronología del universo Zelda. Llega a tu Nintendo Switch The Legend of Zelda: Skyward Sword HD.',
            'precio' => 60.95,
            'stock' => 27,
            'imagen' => '../assets/images/legend-zelda-skyward-sword-hd-portada.png',
            'categoria_id_categoria' => 1
        ]);

        // PLAYSTATION 5

        DB::table('producto')->insert([
            'nombre_producto' => 'Resident Evil Village',
            'descripcion' => 'Años después de la pesadilla, Ethan Winters ha conseguido estabilidad y una vida normal con su familia, que no tardará en ser destruida por un héroe de antaño, Chris Redfield. Ambientado tras los terroríficos eventos de Resident Evil 7 Biohazard, la historia comienza con Winters y su mujer Mia viviendo pacíficamente en una nueva localidad, libres de sus pasadas pesadillas. Justo cuando empiezan a construir su nueva vida juntos la tragedia se ceba con ellos de nuevo.',
            'precio' => 57.95,
            'stock' => 32,
            'imagen' => '../assets/images/resident-evil-village-portada.png',
            'categoria_id_categoria' => 2
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Marvel´s Spider-Man: Miles Morales',
            'descripcion' => 'En esta nueva aventura del universo de Marvel’s Spider-Man, el adolescente Miles Morales se va haciendo a su nuevo hogar mientras sigue los pasos de su mentor Peter Parker como el nuevo Spider-Man. Sin embargo, una encarnizada lucha destruye su nuevo hogar, tras lo que el héroe en ciernes descubre que un gran poder conlleva una gran responsabilidad. Para salvar la Nueva York de Marvel, Miles deberá heredar el traje de Spider-Man y hacerlo suyo.',
            'precio' => 69.90,
            'stock' => 45,
            'imagen' => '../assets/images/marvel-spider-man-miles-morales-portada.png',
            'categoria_id_categoria' => 2
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Returnal',
            'descripcion' => 'Rompe el ciclo de caos en un planeta alienígena que no deja de cambiar con Returnal para PlayStation 5. Tras el aterrizaje forzoso en este mundo cambiante, Selene debe buscar en el desolado paisaje una antigua civilización para poder escapar. Sola y aislada, se ve abocada a luchar con uñas y dientes para sobrevivir. Cae derrotada una y otra vez, lo que la obliga a reiniciar su viaje cada vez que muere.',
            'precio' => 63.95,
            'stock' => 37,
            'imagen' => '../assets/images/returnal-portada.png',
            'categoria_id_categoria' => 2
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Gran Turismo 7',
            'descripcion' => 'Revive las mejores carreras de la historia de los videojuegos con el simulador de conducción real que lo cambió todo. Gran Turismo 7 aprovecha todo lo aprendido en sus 22 años de experiencia para ofrecerte las mejores prestaciones en un juego de conducción. Colecciona, modifica, conduce y personaliza cientos de coches, y... ¡lánzate a la pista!.',
            'precio' => 67.45,
            'stock' => 32,
            'imagen' => '../assets/images/gran-turismo-7-portada.png',
            'categoria_id_categoria' => 2
        ]);

        // XBOX SERIES

        DB::table('producto')->insert([
            'nombre_producto' => 'Perfect Dark',
            'descripcion' => 'Joanna Dark vuelve a deslumbrarnos en la remasterización del juego que revolucionó los shooters en primera persona hace 20 años. Perfect Dark vuelve a asombrarnos con sus mecánicas, su catálogo de armas, unos gráficos de vértigo y la heroína más elegante y carismática.',
            'precio' => 64.95,
            'stock' => 30,
            'imagen' => '../assets/images/perfect-dark-portada.png',
            'categoria_id_categoria' => 3
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Mass Effect Legendary Edition',
            'descripcion' => 'Sólo una persona se interpone entre la humanidad y la mayor amenaza a la que se haya enfrentado jamás. Revive la leyenda del comandante Shepard en Mass Effect Legendary Edition, el regreso de la aclamada trilogía a la nueva generación, con graficos remasterizados en 4K Ultra HD.',
            'precio' => 69.95,
            'stock' => 35,
            'imagen' => '../assets/images/mass-effect-legendary-edition-portada.png',
            'categoria_id_categoria' => 3
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Devil May Cry 5',
            'descripcion' => 'Vive la experiencia definitiva con Devil May Cry 5 Special Edition, el juego que exprime todo el potencial de la nueva generación de consolas gracias a un abundante paquete de nuevas características y modos de juego, incluida la llegada de Vergil como personaje jugable. ¡Empieza a cazar demonios a lo grande!',
            'precio' => 69.95,
            'stock' => 35,
            'imagen' => '../assets/images/devil-may-cry-5-portada.png',
            'categoria_id_categoria' => 3
        ]);

        DB::table('producto')->insert([
            'nombre_producto' => 'Grand Theft Auto V: Premium Edition',
            'descripcion' => 'Explora el impresionante mundo de Los Santos y el condado de Blaine en la experiencia definitiva de Grand Theft Auto V, con una variedad de actualizaciones técnicas y mejoras para jugadores nuevos y experimentados.',
            'precio' => 29.99,
            'stock' => 15,
            'imagen' => '../assets/images/gta-v-premium-edition-portada.png',
            'categoria_id_categoria' => 3
        ]);
    }
}
