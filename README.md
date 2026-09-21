¿Que es este Proyecto?
Esta es una aplicacion la cual se encarga de consumir la API_BORAL para poder manejar datos de stock , venta y estadisticas las cuales ayudan al negocio a poder manejarse de manera mas ordenada.



PHP Version --> PHP 8.4.7

Composer Version --> 2.8.9

Extensiones instaladas --->
bcmath
calendar
Core
ctype
curl
date
dom
fileinfo
filter
hash
iconv
json
libxml
mbstring
mysqlnd
openssl
pcre
PDO
pdo_mysql
pdo_pgsql
pgsql
Phar
random
readline
Reflection
session
SimpleXML
SPL
standard
tokenizer
xml
xmlreader
xmlwriter
zlib
<---



## Rutas

### Rutas de la aplicación (definidas en `index.php`)

| Método | Ruta      | Controlador             | Auth | Descripción                                              |
|--------|-----------|-------------------------|------|----------------------------------------------------------|
| GET    | `/`       | `Controller_View@index` | Sí   | Vista principal. Verifica la cookie `jwt`; si no es válida redirige a `login`. |
| GET    | `/login`  | `Controller_View@login` | No   | Vista de inicio de sesión.                               |

La autenticación la realiza `Middleware::verify_jwt()`, que valida con HS256 el JWT de la cookie `jwt` usando la variable de entorno `jwt`.

### Endpoints de la API_BORAL consumidos desde el frontend

Las peticiones se hacen con `fetch` desde los archivos de `Js/` (`ruta`).

| Método | Endpoint            | Usado en                | Descripción                    |
|--------|---------------------|-------------------------|--------------------------------|
| POST   | `/login`            | `login.js`              | Inicio de sesión               |
| POST   | `/logout`           | `index.js`              | Cierre de sesión               |
| GET    | `/me`               | `util.js`               | Datos del usuario autenticado  |
| GET    | `/productos`        | `login.js`, `products.js`, `sells.js` | Listar productos |
| POST   | `/productos`        | `products.js`           | Crear producto                 |
| PUT    | `/productos`        | `products.js`           | Actualizar producto            |
| DELETE | `/productos`        | `products.js`           | Eliminar producto              |
| GET    | `/categoria`        | `products.js`           | Listar categorías              |
| GET    | `/marca`            | `products.js`           | Listar marcas                  |
| GET    | `/data_products`    | `products.js`           | Datos de productos             |
| GET    | `/data_register`    | `products.js`           | Datos de registros             |
| POST   | `/register`         | `sells.js`              | Registrar una venta            |
| POST   | `/confirm_register` | `sells.js`              | Confirmar un registro de venta |
| POST   | `/stats`            | `stats.js`              | Obtener estadísticas           |
