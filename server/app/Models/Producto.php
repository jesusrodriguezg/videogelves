<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    // Definimos el nombre de la tabla con la que se corresponde la entidad
    protected $table = "producto";

    // Definimos la PRIMARY KEY de la tabla USER
    protected $primaryKey = "id_producto";

    // Variable con la que nos aseguramos que el campo PRECIO es un double y no un varchar
    protected $casts = ['precio' => 'float'];

    // Definimos la relación con la entidad Categoria
    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }
}
