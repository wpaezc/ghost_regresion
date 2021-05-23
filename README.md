# Pruebas con generación de datos
## 1. Integrantes
|Nombres|Email|
|-------|------|
|Manuel Alejandro Sanchez Masferrer|ma.sanchezm12@uniandes.edu.co|
|Ivan Dario Peñaloza Rojas|i.penalozar@uniandes.edu.co|
|Christtian Alfredo Manzo Parra|ca.manzo973@uniandes.edu.co|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|

## 2. Incidencias reportadas

Las incidencias se encuentran en la lista <strong>Incidencias Generacion de Datos </strong> registrada en Trello: [Link](https://trello.com/b/e5H7xPH5/incidencias-ghost-3425)

## 3. Descripción de estrategias usadas

En el siguiente link en la Wiki: [Link](https://github.com/wpaezc/ghost_regresion/wiki/Estrategias-usadas)

## 4. Configuración necesaria antes de ejecutar las pruebas
Dado la cantidad de escenarios bajo pruebas, es sumamente importante tener configurado GHOST 3.42.5 para no limitar los **100** inicios de sesión por hora. Se recomienda usar [este archivo de configuración](https://github.com/TryGhost/Ghost/blob/main/core/shared/config/defaults.json#L52) como base, cambiando los valores del key "span" necesarios. 

Para configurar **Playwright**:

Dar un ```npm install``` y cambiar los siguientes valores en el archivo de configuración _playwright_properties.json_ en caso que tenga otro ghostUrl, user o password.

```json
{
  "ghostUrl": "http://localhost:2368",
  "user": "admin@admin.com",
  "password": "abcde12345",
  "version":"v2",
  "nameScreenPath":"playwright_screenshots"
}
```

Para configurar **Kraken**:
En caso no tenga kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de _GHOST_URL_, _USER_ o _PASSWORD_ en caso tenga otros valores.

```json
{
  "version": "v2",
  "@user1": {
    "GHOST_URL": "http://localhost:2368",
    "USER": "admin@admin.com",
    "PASSWORD": "abcde12345"
  }
}
```

## 5. Ejecutar los escenarios
### 5.1  Estrategia con **escenario aleatorio**
Los **20** escenarios desarrolladas con _kraken_ usan escenarios aleatorios. Para correr las pruebas usar el comando:

```kraken-mobile run --properties=kraken_properties.json```

Para ejecutar los **12** escenarios en _playwright_ correr cada escenario de forma individual:

```sh
node Playwright/fakerSettingsManagementChangeBlogInfoInvalid.js 
node Playwright/fakerSettingsManagementChangeMetadataLimit.js
node Playwright/fakerUserManagementChangeUserDataLimit.js
node Playwright/fakerSettingsManagementChangeBlogInfoLimit.js
node Playwright/fakerSettingsManagementChangeMetadataValid.js
node Playwright/fakerUserManagementChangeUserDataValid.js
node Playwright/fakerSettingsManagementChangeBlogInfoValid.js
node Playwright/fakerUserManagementChangePasswordInvalid.js
node Playwright/fakerUserManagementInviteStaffInvalid.js
node Playwright/fakerSettingsManagementChangeMetadataInvalid.js
node Playwright/fakerUserManagementChangeUserDataInvalid.js
node Playwright/fakerUserManagementInviteStaffValid.js
```
### 5.2  Estrategia con **pool de datos a-priori**

Para ejecutar los **130** escenarios en _playwright_ correr cada archivo de forma individual:

```sh
node Playwright/poolAPrioriPageManagementCreatePageDraft.js #25 escenarios
node Playwright/poolAPrioriPageManagementPublishPage.js #25 escenarios
node Playwright/poolAPrioriPostManagementCreatePostDraft.js #25 escenarios
node Playwright/poolAPrioriPostManagementPublishPost.js #25 escenarios
node Playwright/poolAPrioriSettingsManagementChangeMetadata.js #10 escenarios
node Playwright/poolAPrioriUserManagementChangePassword.js #10 escenarios
node Playwright/poolAPrioriUserManagementChangeUserData.js #10 escenarios
```

### 5.3  Estrategia con **pool de datos (pseudo) aleatorio dinámico**

Para ejecutar los **10** escenarios en _playwright_ correr el archivo de forma individual:

```sh
node Playwright/poolRandomUserManagementInviteStaff.js #10 escenarios
```

## 6. Todas las funcionalidades bajo pruebas de generación de datos

- Escenarios de funcionalidad **Manejo de posts**

|Playwright|Kraken|
|-|-|
|Crear post sin publicar (Draft)|Crear post sin publicar (Draft)|
|Crear post y publicar sin adicionar fecha|Crear post y publicar en el instante|


- Escenarios de funcionalidad **Manejo de páginas**

|Playwright|Kraken|
|-|-|
|Crear página sin publicar (Draft)|Crear página sin publicar (Draft)|
|Crear página y publicar sin adicionar fecha|Crear página y publicar en el instante|
||Crear post con una fecha futura para su publicación|
||Crear post con un slug especifico en el URL| 

- Escenarios de funcionalidad **Manejo de Tags**

|Playwright|Kraken|
|-|-|
|Crear tag sin asociar a post|Crear tag sin post asociado|
|Crear tag con slug no por defecto |Crear tag y asociar post|
|Modificar el slug de un tag ya creado|Cambiar slug de navegación del tag|
|Modificar el titulo de un tag ya creado|Cambiar meta data del tag|

- Escenarios de funcionalidad **Manejo de usuario**

|Playwright|Kraken|
|-|-|
|Actualiza los datos del usuario|Actualiza los datos del usuario|
|Cambio de password inválido|Cambio de password inválido|

- Escenarios de funcionalidad **Invitar nuevos usuarios**

|Playwright|Kraken|
|-|-|
|Crear una invitación con un email inválido|Crear una invitación con un email inválido|
|Crear una invitación con un email válido|Crear una invitación con un email válido|
|Elimina invitación a un usuario|Elimina invitación a un usuario|


