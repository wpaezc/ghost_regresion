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

## 3. Decripción de estrategias usadas


## 4. Configuración necesaria

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

### 4.1  Estrategia con **escenario aleatorio**
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
### 4.2  Estrategia con **pool de datos a-priori**

Para ejecutar los **130** escenarios en _playwright_ correr cada archivo de forma individual:

```sh
node poolAPrioriPageManagementCreatePageDraft.js #25 escenarios
node poolAPrioriPageManagementPublishPage.js #25 escenarios
node poolAPrioriPostManagementCreatePostDraft.js
node poolAPrioriPostManagementPublishPost.js
node poolAPrioriSettingsManagementChangeMetadata.js
node poolAPrioriUserManagementChangePassword.js #10 escenarios
node poolAPrioriUserManagementChangeUserData.js
```

### 4.3  Estrategia con **pool de datos (pseudo) aleatorio dinámico**

Para ejecutar los **10** escenarios en _playwright_ correr el archivo de forma individual:

```sh
node poolRandomUserManagementInviteStaff.js #10 escenarios
```

## 5. Todas las funcionalidades bajo pruebas de generacion de datos

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


