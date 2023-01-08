
# Interview
**El proyecto de node utiliza la versión 14**  
**El proyecto de react utiliza la versión 16**  
**Ambos proyectos respetan StandardJs**  

## Instalación y configuración

### Con Docker compose 

1. Cloná el repositorio

2. Ubicado en la raíz del proyecto (toolbox interview) ejecutá el comando

```
docker compose up
```

para crear las imágenes del proyecto de express y react e iniciar los contenedores.

3. La API estará escuchando al puerto 8080  
El cliente de React estará escuchando al puerto 3000

**Endpoints disponibles**
**node api**
- [http://localhost:8080/files/data](http://localhost:8080/files/data)
Recibe opcionalmente el parámetro fileName por querystring
ej: [http://localhost:8080/files/data?fileName=test2.csv](http://localhost:8080/files/data?fileName=test2.csv)

- [http://localhost:8080/files/lists](http://localhost:8080/files/lists)

- [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

**react**
- [http://localhost:3000](http://localhost:3000)

Los tests de la API de Node se correrán al crear la imagen de Docker.
Para testear nuevamente la API de Node:

```
docker run --rm node_interview npm test
```
---
### Sin Docker
  
  **1**. Cloná el repositorio

- **Para levantar el servidor de node**

2. Verificá la versión de Node, debido a que el proyecto fue construido con la versión 14.  
Ejemplo de como verificar la versión: `nvm current`

3. Ingresá a la carpeta Node ubicada en la raíz del proyecto y ejecutá
```
npm install
```
```
npm start
```
4. En caso de querer testear el servicio ejecutá.
```
npm test
```
 Tené en cuenta que el servidor debe estar apagado.
 
5. Los endpoints expuestos serán los mismos que se especificaron previamente.

- **Para levantar el servidor de React**

2. Verificá la versión de Node, debido a que el proyecto fue construido con la versión 16.  
Ejemplo de como verificar la versión: `nvm current`

3. Ingresar a la carpeta React ubicada en la raíz del proyecto y ejecutá
```
npm install
```
```
npm start
```
4. El servicio quedará levantado en la url y puerto especificado previamente.

---
Tener en cuenta que las versiones de Node que se usaron para construir los proyectos difieren. Si bien son 'compatibles' y ambos proyectos se ejecutan con normalidad. Recomiendo utilizar el metodo explicado en la sección [Con Docker compose](#con-docker-compose)



## Autor

-  **Nicolas Canuhe** - [canuhend](https://github.com/canuhend)