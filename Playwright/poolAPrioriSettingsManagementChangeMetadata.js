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

const titleTest = "poolAPrioriSettingsManagementChangeMetadata"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`
const dataPool = require("./poolSources/settingsManagementChangeMetadataPool.json");


const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for SETTINGS MANAGEMENT');

//Función flecha asíncrona
(async () => {

  console.log("Running data pool: settingsManagementChangeMetadataPool.json");
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {

    for (let i = 0; i < dataPool.length; i++) {
        let obj = dataPool[i];
    //Contenido de la prueba
        console.log(browserType+'-------------------------------------------');
        console.log(`Scenario ${i} ${obj.metatitle}:  Change publication metadata with valid values`);

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
        await page.click('"General"')
        await screen.shot('display_settings')
        await page.click("button:right-of(:text('Meta data'))");
        await screen.shot('publication_info')
        await page.fill("input:below(:text('Meta title'))", obj.metatitle);
        await screen.shot('changed_metadata')
        await page.click('"Save settings"')
        await screen.shot('saved_settings')


        //Finalizar la prueba
        console.log('Ok Scenario:  Change publication info')
        await browser.close();
        }
    }
  return;
})();//Llamado propio de la función
