# Repositorio de entregas backEnd de Santiago Vittor para CoderHouse

_En este repositorio se subirán los archivos correspondientes a las entregas del curso de programación backend para CoderHouse_

## De momento 📋

```
Entrega de clase número 22 : Mocks y Normalización 
```

## Descripción

Se puede cargar productos a través del formulario inicial, que se vén reflejados en tiempo real en la tabla inferior.
También se incorpora un chat con el formato solicitado. En el se pueden escribir mensajes una vez iniciada la sesión con algún correo electrónico.
Tanto los productos como los mensajes son agregados y leidos de y desde sus respectivas tablas 'products' y 'messages', cuya lógica se encuentra programada en los archivos productsManagerSQL.js y messagesManagerSQL.js. 
La configuración de mysql se encuentra en database/options/mysqlconfig.js.


## Rutas ℹ️	


### En el despliegue actual puedes acceder a las siguientes rutas: 

Para acceder a una tabla creada con cinco productos aleatorios traidos desde Faker.
```
/api/productos-test
```


Para agregar productos y mensajes al chat interactuando con el front desde
```
/
```

Para probar los métodos del productsManager agregué tres rutas que son

```
/getProductById/:id
```

```
/deleteProductById/:id  (funciona con el método delete)
```

```
/deleteAll  (funciona con el método delete)
```



## Autor ✒️

* **Santiago Vittor** - *Sitio Web* - [santiagoVittorWeb](https://santiagovittorweb.vercel.app/)
