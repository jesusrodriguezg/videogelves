<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>¡Has realizado tu compra!</title>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            text-align: left;
        }

        span{
            font-weight: bold;
        }
    </style>
</head>
<body>
    <p>¡Hola, {{$nombre}}!</p>
    <p>Hemos completado tu proceso de compra. Éste es un resumen de tu factura:</p>

        <span>ID de compra: </span>{{$id_pedido}}<br>
        <span>Fecha: </span>{{$fecha}}<br>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Precio total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($detalle as $det)
                        <tr>
                            <td>{{$det->nombre_producto}}</td>
                            <td>{{$det->precio}}</td>
                            <td>{{$det->cantidad}}</td>
                            <td>{{$det->preciototal}}</td>
                        </tr>
                    @endforeach
                    <tr>
                        <td colspan="3" style="font-weight:bold;">Importe total</td>
                        <td style="font-weight:bold;">{{$importe_total}}€</td>
                    </tr>
                </tbody>
            </table>

    <p>Recuerda que <strong>tienes 15 días para devolver tus productos.</strong></p>
    <p>Saludos del equipo de Videogelves. Gracias por confiar en nosotros.</p>
</body>
</html>
