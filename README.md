# TP2 CouchDB + Docker Compose 📘 

## Introducción
El trabajo consta de una aplicación web que permite al usuario ingresar nombre, apellido y documento a una base de datos de couchDB, y consultar la información. Además, un servicio ingresa 
datos de forma aleatoria a la base de datos, y genera una deuda también aleatoria.


## Requerimientos previos
- Docker
- Docker Compose

## Arquitectura en docker

El trabajo consta de 3 contenedores, que contienen:
### 🐳 Contenedor 1: Imágen de Apache (httpd)
Servidor web Apache que aloja los archivos estáticos del front. Utiliza un volumen que vincula la carpeta "./front" con la carpeta "/usr/local/apache2/htdocs" dentro del contenedor, que expondrá los archivos. 
Se mapea el puerto 80 de la PC host con el puerto 80 dentro del contenedor.
### 🐳 Contenedor 2: Imágen de NodeJS
Servidor web NodeJS que aloja el backend, con dos bases de datos locales creadas con PouchDB, sincronizadas con el contenedor 3 + Servicio de ingreso de informacion random. 
Se comunica con el contenedor 3 mediante la red interna de docker. Utiliza un volumen que vincula la carpeta "./back" con la carpeta "/app" dentro del contenedor, donde se ejecutará automáticamente el comando "node index.js" para 
levantar el servidor de NodeJS. AVISAR QUE HAY QUE HACER UN NPM INSTALL. Se mapea el puerto 3000 de la PC host con el puerto 3000 dentro del contenedor.
### 🐳 Contenedor 3: Imágen de CouchDB
Contiene una base de datos con CouchDB. Utiliza un volumen creado por Docker que guarda la información de la carpeta "/opt/couchdb/data" dentro de este volumen de docker. Se mapea el puerto 8080 de la PC host con el puerto 
5894 del contenedor de docker (Se utilizó el puerto 8080 ya que es posible que si se tiene instalado couch en la maquina host, ya se utilice ese puerto). Se pasan las variables de entorno: "COUCHDB_USER: admin"
y "COUCHDB_PASSWORD: password" que serán las credenciales de la base de datos de CouchDB.
### Red interna de docker
Se crea una red interna de docker, donde los contenedores se pueden comunicar sin necesidad de salir por fuera de la misma

## Setup ⚙️

Primero clonamos el repositorio con 

```
***git clone urlRepositorio***
```

Nos posicionamos en la carpeta donde se clonó el repositorio y levantamos los contenedores con:

```
***docker compose up***
```

Se levantarán automáticamente los contenedores, la red, y el volumen de CouchDB. Si es la primera vez que lo ejecuta, el volumen creado no tendra información, por lo que hay que configurar la base de datos de 
forma manual. Para ello ingresamos a la url:

"http://localhost:8080/_utils"

Luego, ingresamos las credenciales y nos dirigimos al menu desplegable a la izquierda, y clickeamos en la sección "Setup". Clickeamos en la opción crear un "Single node" ... COMPLETAR


Una ves creado






