const { LoginPage } = require('./models/LoginPage2');
const { Navigate } = require('./models/Navigate');
const { Editor } = require('./models/Editor');
const {Screen} = require('./models/screen')
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "userManagementChangePasswordRandom"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`
const dataPool = require("./poolSources/userManagementChangePasswordDataPool");


const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for USER MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {

    for (let i = 0; i < dataPool.length; i++) {
        let obj = dataPool[i];
    //Contenido de la prueba
        console.log(browserType+'-------------------------------------------');
        console.log('Scenario:  Change password with valid values');

        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page, url, user, password);
        const navigator = new Navigate(page);
        const screen = new Screen(page,pathScreenshotsTest,version);
        const editor = new Editor(page);
        
        //Abrir la URL a probar en la página y cargar el proyecto en una SPA
        await loginPage.enter_ghost();
        await screen.shot('successfulLogin')
        
        //Desplegar los detalles del Staff
        await navigator.clickOnSidebar('staff');
        await screen.shot('display_staff')

        // En la pagina de Staff, hacer click en "Invite people"
        // En la pagina de Staff, hacer click en perfil del owner para editarlo
        await page.click('"Owner"');
        await screen.shot('originalOwnerDetail')
        
        await page.fill('id=user-password-old', password)
        await page.fill('id=user-password-new', obj.pwd)
        await page.fill('id=user-new-password-verification', obj.pwd+'0')
        await screen.shot('passwordEntered')
        await page.click('"Change Password"')
        await screen.shot('passwordInvalid')


        //Finalizar la prueba
        console.log('Ok Scenario:  Change password with invalid values')
        await browser.close();
        }
    }
  return;
})();//Llamado propio de la función
