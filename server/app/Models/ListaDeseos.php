<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\HasCompositePrimaryKey;

class ListaDeseos extends Model
{
    use HasFactory;
    use HasCompositePrimaryKey;

    protected $table = 'lista_deseos';

    protected $primaryKey = [
        'user_id_user',
        'producto_id_producto'
    ];

    protected $fillable = [
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

    // Deshabilitamos el autoincremento por defecto de Laravel para la PK
    public $incrementing = false;
}
