# Proyecto Integrado DAW
### Proyecto integrado del ciclo de Desarrollo de Aplicaciones Web del IES Polígono Sur de Sevilla

Este repositorio contiene el código y la información de desarrollo y despliegue del proyecto integrado desarrollado como trabajo final del ciclo de Formación Profesional de grado superior en Desarrollo de Aplicaciones Web en el IES Polígono Sur de Sevilla, España. El proyecto consiste en una tienda de videojuegos en la que el usuario puede realizar compras, entre otras funciones.

La aplicación se encuentra en construcción y esta documentación se irá ampliando conforme se vayan realizando commits en el repositorio.

### Estructura de la aplicación

La aplicación se divide en dos partes: el backend, desarrollado en PHP con el framerwork Laravel y contenido en el directorio ```server```, y la parte frontend, desarrollada en Angular y contenida en la carpeta ```client```. Las instrucciones de este repositorio son para la construcción y el despliegue en local.

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
create database videogelves default character set utf8mb4 collate utf8mb4_spanish_ci;
create user 'videogelves'@'localhost' identified by 'Aabc123.';
grant all privileges on videogelves.* to 'videogelves'@'localhost' with grant option;
```

Como método alternativo, puedes ejecutar el código del archivo ```db-scripts.sql``` en la consola de ```mysql``` o en clientes gráficos como PhpMyAdmin. Con ello crearás la base de datos, el usuario ```videogelves```, las tablas y las claves foráneas. 

> NOTA: debes incluir el nombre de la BD, el usuario y la contraseña en el archivo ```.env``` del proyecto de Laravel.

### Creación de datos de prueba

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

Copia las dos claves y pégalas en los respectivos campos asignados al final del archivo ```.env``` ubicado en el directorio ```server```. Asigna también el valor de la clave del ID 2 a la variable ```client_secret``` en client > src > login > ```login.component.ts```.

### Ejecución

En el directorio ```server``` ejecuta:

```sh
~$ php artisan serve
```

En el directorio ```client``` ejecuta:

```sh
~$ ng serve
```

Abre el navegador en la url ```http://localhost:4200```.
