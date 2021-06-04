-- Creamos la base de datos con la codificación de caracteres
create database videogelves default character set utf8mb4 collate utf8mb4_spanish_ci;

-- Seleccionamos la base de datos
use videogelves;

-- Creamos las tablas
create table user (
    id_user  integer not null unique auto_increment,
    email       varchar(50) not null,
    password    varchar(25) not null,
    nombre      varchar(25) not null,
    apellidos   varchar(50) not null,
    direccion   varchar(200) not null,
    admin       char not null,
    remember_token  varchar null,
    primary key (id_user)
);

create table categoria (
    id_categoria           integer not null unique auto_increment,
    nombre_categoria       varchar(20) not null,
    descripcion_categoria  varchar(150) not null,
    primary key (id_categoria)
);

create table producto (
    id_producto             integer not null unique,
    nombre_producto         varchar(50) not null,
    descripcion             varchar(250) not null,
    precio                  decimal(4,2) not null,
    stock                   integer not null,
    imagen                  varchar(100) not null,
    categoria_id_categoria  integer not null,
    primary key (id_producto)
);

create table pedido (
    id_pedido           integer not null unique auto_increment,
    comprado            char(1) not null,
    fecha               varchar(10) not null,
    user_id_user  integer not null,
    primary key (id_pedido)
);

create table detalle_pedido (
    pedido_id_pedido      integer not null,
    producto_id_producto  integer not null,
    cantidad              integer not null,
    devuelto              char(1) not null,
    constraint pk_detalle_pedido primary key (pedido_id_pedido,producto_id_producto)
);

create table lista_deseos (
    user_id_user    integer not null,
    producto_id_producto  integer not null
    constraint pk_lista_deseos primary key (user_id_user,producto_id_producto);

);

create table valoracion (
    comentario            varchar(300) not null,
    puntuacion            integer not null,
    user_id_user    integer not null,
    producto_id_producto  integer not null,
    constraint pk_valoracion primary key (user_id_user,producto_id_producto)
);

-- Añadimos las claves foráneas
alter table producto add constraint fk_producto_categoria foreign key (categoria_id_categoria) references categoria (id_categoria);

alter table pedido add constraint fk_pedido_user foreign key (user_id_user) references user (id_user);

alter table detalle_pedido add constraint fk_detalle_pedido_pedido foreign key (pedido_id_pedido) references pedido (id_pedido);

alter table detalle_pedido add constraint fk_detalle_pedido_producto foreign key (producto_id_producto) references producto (id_producto);

alter table lista_deseos add constraint fk_lista_deseos_producto foreign key (producto_id_producto) references producto (id_producto);

alter table lista_deseos add constraint fk_lista_deseos_user foreign key (user_id_user) references user (id_user);

alter table valoracion add constraint fk_valoracion_producto foreign key (producto_id_producto) references producto (id_producto);

alter table valoracion add constraint fk_valoracion_user foreign key (user_id_user) references user (id_user);

-- Creamos el usuario con su contraseña y le otorgamos todos los permisos sobre la bd
create user 'videogelves'@'localhost' identified by 'Aabc123.';
grant all privileges on videogelves.* to 'videogelves'@'localhost' with grant option;;
