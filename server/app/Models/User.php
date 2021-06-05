<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    // Definimos el nombre de la tabla con la que se corresponde la entidad
    protected $table = "user";

    // Definimos la PRIMARY KEY de la tabla USER
    protected $primaryKey = "id_user";

    /**
     * Definimos los campos que se pueden rellenar mediante un formulario
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'nombre',
        'apellidos',
        'direccion'
    ];

    // Definimos qué atributos queremos que tengan un valor por defecto
    protected $attributes = [
        'admin' => 'N'
    ];

    // Definimos los campos que quedan ocultos al hacer una consulta
    // a la BD y serializar el resultado como array u objeto JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Definimos los campos que no se pueden rellenar de forma masiva.
     *
     * @var array
     */
    protected $guarded = [
        'admin',
        'remember_token',
    ];

    // IMPORTANTE --> Al crear un usuario debemos guardarlo en la BD con el método save()

    public function isAdmin(){
        return $this->admin === 'Y';
    }

    // Variable con la que indicamos al ORM que no intente registrar las marcas
    // de tiempo (created_at y updated_at) al hacer un insert en la tabla de usuarios
    public $timestamps = false;
}
