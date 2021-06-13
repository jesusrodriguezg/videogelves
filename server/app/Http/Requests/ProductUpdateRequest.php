<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nombre_producto' => 'required',
            'descripcion' => 'required',
            'precio' => 'required',
            'stock' => 'required',
            'imagen' => 'required',
            'categoria_id_categoria' => 'required'
        ];
    }
}
