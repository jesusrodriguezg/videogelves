<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = "pedido";

    protected $primaryKey = "id_pedido";

    protected $fillable = [
        'comprado',
        'fecha',
        'user_id_user'
    ];

    protected $guarded = [
        'id_pedido'
    ];

    public function user(){
        return $this->belongsTo(Usuario::class);
    }

    public $timestamps = false;
}
