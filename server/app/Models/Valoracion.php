<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;

    protected $table = 'valoracion';

    protected $primaryKey = [
        'user_id_user',
        'producto_id_producto'
    ];

    protected $fillable = [
        'comentario',
        'puntuacion',
        'user_id_user',
        'producto_id_producto'
    ];

    // Definimos la relación con las entidades USER y PRODUCTO

    /**
     * Devuelve el USER asociado al DETALLE_PEDIDO
     *
     * @return void
     */
    public function user(){
        return $this->belongsTo(User::class, 'user_id_user','id_user');
    }

    /**
     * Devuelve el PRODUCTO asociado al DETALLE_PEDIDO
     *
     * @return void
     */
    public function producto(){
        return $this->belongsTo(Producto::class,'producto_id_producto','id_producto');
    }

    public $timestamps = false;
}
