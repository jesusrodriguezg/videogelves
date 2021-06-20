<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>¡Has realizado tu compra!</title>
</head>
<body>
    <p>¡Hola, {{$nombre}}!</p>
    <p>Hemos completado tu proceso de compra. Éste es un resumen de tu factura:</p>
    <ul>
        <li><strong>ID de compra: </strong>{{$id_pedido}}</li>
        <li><strong>Fecha: </strong>{{$fecha}}</li>
        <li><strong>Productos</strong></li>
        <ul>
            @foreach ($detalle as $det)
                <li>{{$det->nombre_producto}} || {{$det->precio}}€ x {{$det->cantidad}} => {{$det->preciototal}}€</li>
            @endforeach
        </ul>
        <li><strong>Importe total: </strong>{{$importe_total}}</li>
    </ul>

    <p>Recuerda que <strong>tienes 15 días para devolver tus productos.</strong></p>
    <p>Saludos del equipo de Videogelves. Gracias por confiar en nosotros.</p>
</body>
</html>
