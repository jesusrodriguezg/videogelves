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

    // Definimos los campos que se pueden asignar de forma masiva
    protected $fillable = [
        'nombre_producto',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria_id_categoria',
    ];

    protected $guarded = ['id_producto'];

    // Variable con la que nos aseguramos que el campo PRECIO es un double y no un varchar
    protected $casts = ['precio' => 'float'];

    // Definimos la relación con la entidad Categoria
    /**
     * Devuelve la CATEGORIA asociada al PRODUCTO
     *
     * @return void
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id_categoria', 'id_categoria');
    }

    // Variable con la que indicamos al ORM que no intente registrar las marcas
    // de tiempo (created_at y updated_at) al hacer un insert en la tabla de productos
    public $timestamps = false;
}
