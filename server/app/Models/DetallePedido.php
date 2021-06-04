<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;

    protected $table = "detalle_pedido";

    protected $primaryKey = ["pedido_id_pedido","producto_id_producto"];

    protected $fillable = [
        'pedido_id_pedido',
        'producto_id_producto',
        'cantidad',
        'devuelto'
    ];

    public function pedido(){
        return $this->belongsTo(Pedido::class);
    }

    public function producto(){
        return $this->belongsTo(Producto::class);
    }

    public $timestamps = false;
}
