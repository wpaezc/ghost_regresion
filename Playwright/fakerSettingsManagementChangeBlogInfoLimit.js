const faker = require('faker');
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

const titleTest = "settingsManagementChangeBlogInfoInvalidFaker"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for SETTINGS MANAGEMENT CHANGE LIMIT BLOG INFO');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {

    for (let i = 0; i < 2; i++) {
    //Contenido de la prueba
        console.log(browserType+'-------------------------------------------');
        console.log(`Scenario ${i}:  Change publication info with valid values`);

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
        await page.click("button:right-of(:text(\"Title & description\"))");
        await screen.shot('publication_info')
        await page.fill("input:above(:text('The name of your site'))", faker.lorem.sentence(20) );
        await page.fill("input:above(:text('Used in your theme, meta data and search results'))", faker.lorem.paragraph(3));
        await screen.shot('changed_publication_info')
        await page.click('"Save settings"')
        await screen.shot('saved_settings')


        //Finalizar la prueba
        console.log('Ok Scenario:  Change publication info')
        await browser.close();
        }
    }
  return;
})();//Llamado propio de la función
