# Pruebas de Regresión
## 1. Integrantes
|Nombres|Email|
|-------|------|
|Manuel Alejandro Sanchez Masferrer|ma.sanchezm12@uniandes.edu.co|
|Ivan Dario Peñaloza Rojas|i.penalozar@uniandes.edu.co|
|Christtian Alfredo Manzo Parra|ca.manzo973@uniandes.edu.co|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|

## 2. Incidencias reportadas

Las incidencias se encuentran registradas en Trello: [Link](https://trello.com/b/e5H7xPH5/incidencias-ghost-3425)

## 3. Resultados finales
Hemos enfocado las pruebas de generacion de datos en las herramientas Playwright, Kraken, Mockaroo y Faker. Los test se corren sobre la version 3.42.5 de Ghost.

Se corrieron mas de 120 pruebas Pool a priori con las herramientas de Playwright y Mockaroo

Se corrieron mas de 120 pruebas con las herramientas de Playwright y Faker

Se corrieron mas de 120 pruebas con las herramientas de Kraken y Mockaro

Los screenshots de los test se encuentran en las carpetas **_./kraken_screeenshots_** y **_./playwright_screenshots**.



Los screenshots de los escenarios se pueden encontrar en las siguientes carpetas

|Nombre del scenario| Carpeta | Herramienta para screenshots |
|-----|-----|-----|
|**Page Management:** Create page with draft state|poolAPrioriPageManagementCreatePageDraft|Playwright|
|**Page Management:** Publish page|poolAPrioriPageManagementPublishPage|Playwright|
|**Post Management:** Create post with draft state|poolAPrioriPostManagementCreatePostDraft|Playwright|
|**Post Management:** Publish post|poolAPrioriPostManagementPublishPost|Playwright|
|**Setting Management:** Change metadata|poolAPrioriSettingsManagementChangeMetadata|Playwright|
|**Setting Management:** Change password|poolAPrioriUserManagementChangePasswordRandom|Playwright|
|**Setting Management:** Change user's data|poolAPrioriUserManagementChangeUserDataRandom|Playwright|
|**Setting Management:** Invite staff|poolAPrioriUserManagementInviteStaff|Playwright|



## 4. Pasos para tomar screenshots en la versión Ghost 3.3.0
Clonar el repositorio y cambiar el código al tag v1: ```git checkout tags/v1```
La version de node recomendada es la ```12.20.1```. 



## 6. Pasos para tomar screenshots en la versión Ghost 3.42.5
Clonar el repositorio y cambiar el código a master: ```git checkout master```
La version de node recomendada es la ```12.20.1```. 

### 6.1 Tomar screenshots con Playwright
Dar un ```npm install``` y cambiar los siguientes valores en el archivo de configuración _playwright_properties.json_ en caso que tenga otro ghostUrl, user o password. Es importante mantener en este archivo los valores de "version" v2 y "nameScreenPath" para generar correctamente los nombres del screenshot.

```json
{
  "ghostUrl": "http://localhost:2368",
  "user": "admin@admin.com",
  "password": "abcde12345",
  "version":"v2",
  "nameScreenPath":"playwright_screenshots"
}
```
Para ejecutar los 20 escenarios de ***Playwright*** se tienen que realizar de forma individual:
```sh
node Playwright/poolAPrioriPageManagementCreatePageDraft.js
node Playwright/poolAPrioriPageManagementPublishPage.js
node Playwright/poolAPrioriPostManagementCreatePostDraft.js
node Playwright/poolAPrioriPostManagementPublishPost.js
node Playwright/poolAPrioriSettingsManagementChangeMetadata.js

node Playwright/poolAPrioriUserManagementChangePassword.js
node Playwright/poolAPrioriUserManagementChangeUserData.js
node Playwright/poolAPrioriUserManagementInviteStaff.js

node Playwright/fakerSettingsManagementChangeBlogInfoInvalid.js
node Playwright/fakerSettingsManagementChangeBlogInfoLimit.js
node Playwright/fakerSettingsManagementChangeBlogInfoValid.js
node Playwright/fakerSettingsManagementChangeMetadataInvalid.js

node Playwright/fakerSettingsManagementChangeMetadataLimit.js
node Playwright/fakerUserManagementChangePasswordInvalid.js
node Playwright/fakerUserManagementChangeUserDataInvalid.js
node Playwright/fakerUserManagementChangeUserDataLimit.js

node Playwright/fakerUserManagementChangeUserDataValid.js
node Playwright/fakerUserManagementInviteStaffInvalid.js
node Playwright/fakerUserManagementInviteStaffLimit.js
node Playwright/fakerUserManagementInviteStaffValid.js

Playwright_Jest/
Playwright_Jest/
Playwright_Jest/

Playwright_Jest/
Playwright_Jest/
Playwright_Jest/

Playwright_Jest/
Playwright_Jest/
Playwright_Jest/

```
Para ejecutar ejecutar los 5 escenarios faltantes ***playwright-jest*** usar el comando: ```npm test```

Al final se crearán 29 carpetas en el folder **_./playwright_screenshots_**. Los screenshots de los 29 escenarios serán creados en el siguiente formato **_./playwright_screenshots/featureScenario/v2_nombre_del_step.png**

### 6.2 Tomar screenshots con Kraken
En caso no tenga kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de _GHOST_URL_, _USER_ o _PASSWORD_ en caso tenga otros valores. Es importante mantener en este archivo el valor "version" v2

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
Se ejecutan las pruebas ***kraken*** con el comando: ```kraken-mobile run --properties=kraken_properties.json```

Al final se crearán 20 carpetas en el folder **_./kraken_screenshots_**. Los screenshots de los 20 escenarios serán creados en el siguiente formato **_./kraken_screenshots/feature_scenario/v2_nombre_del_step.png**



## 9. Todas las funcionalidades bajo pruebas y escenarios

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


