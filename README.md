# VideoGelves | Proyecto Integrado DAW
### Proyecto integrado del ciclo de Desarrollo de Aplicaciones Web del IES Polígono Sur de Sevilla

Este repositorio contiene el código y la información de desarrollo y despliegue del proyecto integrado desarrollado como trabajo final del ciclo de Formación Profesional de grado superior en Desarrollo de Aplicaciones Web en el IES Polígono Sur de Sevilla, España.

### Propósito del proyecto

El proyecto consiste en una tienda online de videojuegos, en la que hay un catálogo de juegos que puede ser consultado sin necesidad de registro, pero para la compra es preciso registarse. Entre las funcionalidades y características de la tienda se encuentran:

- Registro / login de usuarios
- Compra de juegos (añadir al carrito / tramitar compra)
- Añadir juegos a una lista de deseos
- Consultar su historial de compra
- Devolver productos (hasta 15 después de la compra)
- Búsqueda de juegos en el catálogo (barra de búsqueda)
- Administración de productos y usuarios (sólo ADMIN)
- Diseño responsive

### Estructura y tecnologías

La aplicación se divide en dos partes: backend (directorio ```server```) y frontend (directorio ```client```). Las tecnologías usadas en el desarrollo son las siguientes:

* **Laravel 8** (PHP) para el desarrollo del backend
* **Angular 11** para el desarrollo del backend
* **MySQL** como gestor de bases de datos
* **Eloquent** como ORM para la creación de modelos y consultas de BBDD
* **Bootstrap 5**, **CSS3** y **JQuery** para el diseño
* **Tinker** para el debug del backend
* **DataTables** para el diseño de tablas de datos
* **Material** para el diseño de formularios y algunos componentes adicionales en Angular

### Requisitos previos

Las instrucciones de este repositorio son para la construcción y el despliegue en local. Para ello primero debes instalar Laravel, Angular y MySQL. Aquí se aportan los pasos para instalar las tres tecnologías.

##### Instalación de Laravel

Primero instalamos **Composer** (gestor de paquetes de PHP) con los siguientes comandos:

```sh
~$ sudo apt update
~$ sudo apt install curl
~$ sudo apt install php-cli unzip
~$ cd ~
~$ curl -sS https://getcomposer.org/installer -o composer-setup.php
~$ HASH=`curl -sS https://composer.github.io/installer.sig`
~$ echo $HASH
~$ php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
~$ sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

Puedes comprobar que Composer se ha instalado correctamente con el comando:

```sh
~$ composer
```

Luego instalamos PHP y todas las dependencias necesarias con los siguientes comandos:

```sh
~$ sudo apt-get install php7.4-intl php7.4-bcmath php7.4-common php7.4-json php7.4-mbstring openssl php7.4-xml
~$ sudo apt-get install php7.4-soap php7.4-curl
~$ sudo apt-get install php7.4-mysql
```


##### Instalación de Angular 11

Instalamos **NodeJS** con el gestor de paquetes **npm**.

```sh
~$ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
~$ source ~/.bashrc
~$ nvm install node
```

Luego instalamos la versión 11 de **Angular**:

```sh
~$ npm install -g @angular/cli@11
```

##### Instalación de MySQL

Instalamos **MySQL** client y server con los siguientes comandos:

```sh
~$ sudo apt install mysql-client
~$ sudo apt install mysql-server
```

### Construcción de la aplicación

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

> NOTA: para mayor facilidad, se ha includio en el repositorio el archivo ```.env``` del directorio ```server```. Los parámetros fijos (nombre del proyecto, base de datos) están ya establecidos, mientras que los variables (servidor de correo SMTP, claves de oauth) están vacíos pero señalizados. A lo largo de las instrucciones se indica qué datos hay que introducir y dónde.

### Configuración de la base de datos

Antes de ejecutar el proyecto tenemos que crear la base de datos. Accede a PhpMyAdmin o ejecuta en tu consola:

```sh
~$ mysql -u root -p
```

Crea la base de datos y el usuario con las siguientes sentencias SQL:

```sql
create database videogelves default character set utf8mb4 collate utf8mb4_spanish_ci;
create user 'videogelves'@'localhost' identified by 'Aabc123.';
grant all privileges on videogelves.* to 'videogelves'@'localhost' with grant option;
```

Como método alternativo, puedes ejecutar el código del archivo ```db-scripts.sql``` en la consola de ```mysql``` o en clientes gráficos como PhpMyAdmin. Con ello crearás la base de datos, el usuario ```videogelves```, las tablas y las claves foráneas. 

> NOTA: los datos relativos a la BD están ya incluidos en el archivo ```.env``` del directorio ```.env```, aunque puedes editarlos si quieres asignar valores distintos, así:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=NOMBRE_DE_LA_BD
DB_USERNAME=USUARIO_DE_LA_BD
DB_PASSWORD=CONTRASEÑA
```

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

### Configuración del envío de correos electrónicos

La aplicación envía correos electrónicos a los usuarios tanto al darse de alta como al completar una compra. Para ello es necesario editar algunos parámetros.

En el archivo ```.env``` ubicado en el directorio ```server```, configura los siguientes parámetros:

```sh
MAIL_MAILER=smtp
MAIL_HOST=smtp.googlemail.com
MAIL_PORT=465
MAIL_USERNAME=EMAIL_DE_ENVÍO
MAIL_PASSWORD=CONTRASEÑA_DE_EMAIL_DE_ENVÍO
MAIL_ENCRYPTION=ssl
```

> NOTA: esta configuración es para envío de correo SMTP con Gmail. Puedes usar otros servidores SMTP o servicios con API como Mailgun o Postmark. Tienes [más información sobre configuración en la documentación de Laravel](https://laravel.com/docs/8.x/mail).

Adicionalmente, para configurar correctamente las notificaciones, has de acceder a ```server > app > http > controllers``` el método ```register()``` en ```UserController.php``` y el método ```compra()``` en ```PedidoController.php``` de la siguiente forma:

```php
$message->from('Tu dirección de email','Remitente del correo (por defecto, Videogelves)');
$message->subject('Asunto del mensaje');
$message->to($email);
$message->bcc('Dirección del remitente'); // opcional, sirve para recibir una copia oculta (CCO / BCC) de cada mensaje
```

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

### Manual de usuario

En este repositorio se incluye un documento PDF con el manual de uso de de la aplicación. En él se explican todas las funcionalidades con capturas de pantalla para una mayor facilidad de uso.