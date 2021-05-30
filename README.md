# Proyecto Integrado DAW
### Proyecto integrado del ciclo de Desarrollo de Aplicaciones Web del IES Polígono Sur de Sevilla

Este repositorio contiene el código y la información de desarrollo y despliegue del proyecto integrado desarrollado como trabajo final del ciclo de Formación Profesional de grado superior en Desarrollo de Aplicaciones Web en el IES Polígono Sur de Sevilla, España.

La aplicación se encuentra en construcción y esta documentación se irá ampliando conforme se vayan realizando commits en el repositorio.

### Construcción de los proyectos de Angular y Laravel

Descarga o clona el repositorio:

```sh
~$ git clone https://github.com/jesusrodriguezg/proyecto-integrado
```

Cambia a la carpeta ```client``` y construye el proyecto en Angular para servir la parte de frontend:

```sh
~$ cd client
~$ npm install
```

Cambia a la carpeta ```server``` y construye el proyecto de Laravel para servir la parte de backend:

```sh
~$ cd ../server
~$ composer install
```

### Configuración de la base de datos

Antes de ejecutar el proyecto tenemos que crear la base de datos. Ejecuta ```mysql``` en tu consola o entra en el administrador de PhpMyAdmin para crear la base de datos y el usuario con las siguientes sentencias SQL:

```sql
CREATE DATABASE videogelves DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
CREATE USER 'videogelves'@'localhost' IDENTIFIED BY 'Aabc123.';
GRANT ALL PRIVILEGES ON VIDEOGELVES.* TO 'videogelves'@'localhost' WITH GRANT OPTION;
```

> NOTA: los parámetros relativos a la base de datos ya se encuentran configurados en el archivo .env del proyecto de Laravel que se incluye en este repositorio.

Crea las tablas con los archivos de migraciones del proyecto de Laravel. En el directorio ```server``` ejecuta el siguiente comando:

```sh
~$ php artisan migrate:fresh
```

Opcionalmente puedes incluir algunos datos de prueba con los seeders que se incluyen en este proyecto, mediante este comando:

```sh
~$ php artisan db:seed
```

### Configuración de la clave secreta de oauth

En el directorio ```server``` ejecuta el siguiente comando:

```sh
~$ php artisan passport:install --force
```

Esto generará información necesaria para la autenticación de usuarios entre la parte cliente y la parte servidor. En la salida de la consola de comandos recibirás dos claves secretas de esta forma:

```sh
Client ID: 1
Client secret: 05uUZtQph9UNdeVqqbrRu1BT4s56EDBhlaLPdltV
Password grant client created successfully.
Client ID: 2
Client secret: LYmFJusiC5doqlM5dHGN3Efb0eSGmcPWJZw0Fkqk
```

Copia las dos claves y pégalas en los respectivos campos asignados al final del archivo ```.env``` ubicado en el directorio ```server```.

### Ejecución

En el directorio ```server``` ejecuta:

```sh
~$ php artisan serve
```

En el directorio ```client``` ejecuta:

```sh
~$ php ng serve
```

Abre el navegador en la url ```http://localhost:4200```.
