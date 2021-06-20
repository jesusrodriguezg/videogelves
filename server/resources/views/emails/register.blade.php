<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>¡Registro completado!</title>
</head>
<body>
    <p>¡Hola, {{$data['nombre']}}! Hemos completado con éxito tu proceso de registro en Videogelves. Éstos son tus datos:</p>
    <ul>
        <li>Nombre: {{$data['nombre']}}</li>
        <li>Apellidos: {{$data['apellidos']}}</li>
        <li>Correo electrónico: {{$data['email']}}</li>
        <li>Dirección: {{$data['direccion']}}</li>
    </ul>
    <p>Accede a nuestra web para iniciar sesión y poder comprar.</p>
    <p><a href="http://videogelves.com/login"></a></p>
    <p>Saludos del equipo de Videogelves.</p>
</body>
</html>
