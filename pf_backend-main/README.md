# PROYECTO FINAL BACKEND

1. [Sobre el proyecto](#ABOUT)
2. [Consola](#CONSOLA)
3. [Endpoints - Ejemplos / Criterio (Http)](#HTTP)
4. [Postman](#POSTMAN)
5. [Librerias Utilizadas](#LIBRERIAS)
---

## <a>ABOUT</a>

- Proyecto final del curso de backend Coderhouse. El mismo trabaja con base de datos MongoDB

## <a>CONSOLA</a>
[3] Opcional puerto -> Puerto de Inicio<br>
[4] Opcional DB -> En caso de agregar otras opciones al factory de producto. Default MongoDB.<br>

Ejemplo<br>
- Modo Nodemon: yarn nm [8080] [1] || yarn nm [8080]<br>
- Modo Development: yarn dev [8080] [1] || yarn dev [8080]<br>
- Modo Production: yarn prod [8080] [1] || yarn prod [8080]<br>

Resto de configuraciones se aplican en los dos archivos .env (modelos ubicados en /src/config)

## <a>HTTP</a> 

### USER:
- POST /user/register -> Permite el registro de usuario con encriptacón de password.<br>
Ejemplo:
<dl>
    <dt>{</dt>
    <dd>"email": "maria@quiz.com",</dd>
    <dd>"password": "micalle123"</dd>
    <dd>"username": "Maria",</dd>
    <dd>"phone": 1223366788</dd>
    <dt>}</dt>
</dl>

- POST /user/login -> Permite el ingreso al sistema con validación de credenciales y tiempo de sesión.<br>
Ejemplo:
<dl>
 <dt>{</dt>
    <dd>"email": "maria@quiz.com",</dd>
    <dd>"password": "micalle123"</dd>
    <dt>}</dt>
</dl>

- GET /user/logout -> Desloguea al usuario de la sesión.

Caso que el usuario no este logueado no tendrá acceso al sistema y será redireccionado al inicio "/".

### PRODUCTO:
(Valida usuario logueado).
- GET /api/productos -> Trae todos los productos.
- GET by ID /api/productos/:id -> Trae producto por ID desde la base de datos.
- GET by CATEGORY /api/productos/category/:category -> Filtra producto(s) por categoria.
- POST /api/productos -> Guarda los productos en la base de datos a traves (Alternativa desde Postman (req.body) y con  Socket.io (req.productos)).<br>
Ejemplo:
<dl>
<dt>{</dt>
    <dd>"title": "Pan",</dd>
    <dd>"price": 30,</dd>
    <dd>"thumbnail": "https://cdn0.iconfinder.com/data/icons/bakery-and-dessert-color/64/Bread_bun_bakery_doodle_food_icon-128.png",</dd>
    <dd>"description": "Pan de Trigo",</dd>
    <dd>"category": "Harina",</dd>
    <dd>"stock": 1000</dd>
    <dt>}</dt>
</dl>

- DELETE /api/productos/:id -> Elimina producto por ID informado.
- PUT /api/productos/:id -> Actualiza un producto por ID informado.

### CART:
(Valida usuario logueado).
- GET /api/cart -> Trae todos los carritos de compra guardados.
- GET by ID /api/cart/:id -> Trae un carrito especifico por su ID.
- POST /api/cart -> Guarda el carrito del usuario que este logueado. Se implementaria en el fronend lo necesario para lograr tener un carrito.<br>
Ejemplo:
<dl>
 <dt>{</dt>
    <dd>"direction": "Av. Pampa 123",</dd>
    <dd>"email": "pedro@quiz.com",</dd>
    <dd>"items": <dt>[{</dt> 
            <dd>"title": "Naranja",</dd>
            <dd>"price": 50,</dd>
            <dd>"description": "Naranja Jugo",</dd>
            <dd>"category": "Frutas",</dd>
            <dd>"quantity": 12</dd>
            <dt>},{</dt>
            <dd>"title": "Banana",</dd>
            <dd>"price": 120,</dd>
            <dd>"description": "Banana Ecuador",</dd>
            <dd>"category": "Frutas",</dd>
            <dd>"quantity": 6</dd>
        <dt>}]}</dt>
</dl>

- UPDATE /api/cart:id -> Devuelve al frontend un array con toda la información del carrito por su ID. Se implementaria vista y lógica para modificar los valores dentro de un carrito , como eliminar items, cambiar cantidad, etc y poder devolver a la base de datos.
- DELETE /api/cart:id -> Elimina un carrito completo por su ID.

### ORDER:
(Ejecuta el pedido final de una compra. Se implementaria en el frontend lógica y vista para generar un array que contenga los datos del usuario logueado en sesión -como buyer- a través del ID , el status de la orden y un array con todos los items guardados en su carrito previamente creado, también cargado a traves del ID correspondiente).
- POST /api/order -> Envia y guarda la orden de compra.<br>
Ejemplo:
<dl>
<dt>{</dt>
    <dd>"userId": "61553d6981d5de474926cafa",</dd>
    <dd>"status": "Generada",</dd>
    <dd>"cartId": "615534e769cade37b7e01721"</dd>
    <dt>}</dt>
</dl>

- GET /api/order -> Devuelve todas las ordenes almacenadas.
- GET /api/order/:id -> Devuelve una orden especifica por su ID.
- DELETE /api/order/:id -> Elimina una orden especifica por su ID.

## <a>POSTMAN</a>

https://www.getpostman.com/collections/e0fa3eded4cd156a3f43

## <a>LIBRERIAS / DEPENDENCIAS USADAS</a>

- bcryptjs 
- connect-flash 
- cookie-parser 
- dotenv 
- ejs 
- express
- express-handlebars 
- express-session 
- jsonwebtoken 
- mongoose 
- morgan 
- nodemailer 
- nodemon 
- passport 
- passport-jwt 
- passport-local 
- pug 
- socket.io 
- socketio 
- winston 
