<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;

    protected $table = "detalle_pedido";

    protected $primaryKey = ["id_pedido","id_producto"];

    protected $fillable = [
        'id_pedido',
        'id_producto',
        'cantidad',
        'devuelto'
    ];

    public function id_pedido(){
        return $this->belongsTo(Pedido::class);
    }

    public function id_producto(){
        return $this->belongsTo(Producto::class);
    }

    public $timestamps = false;
}
