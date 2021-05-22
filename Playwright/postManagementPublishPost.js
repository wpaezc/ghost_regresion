//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
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

const titleTest = "postManagementPublishPost"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Publish post')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    const screen = new Screen(page,pathScreenshotsTest,version);
    const editor = new Editor(page);
    await loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await navigator.clickOnSidebar('posts')
    await screen.shot('visit_posts')

    // Crear nueva post
    await navigator.clickOnNewEditor('post')
    await screen.shot('new_post')

    // editar titulo del post
    await editor.fillTitle("Publish on editor")
    await screen.shot('editing')

 
    await editor.triggerSave()
    await editor.openPublishPopup()
    await screen.shot('open_publish_popup')

    await editor.publish()
    await screen.shot('finish_publishing')


    // // salir de la post
    await navigator.saveAndFinishEditing('posts')
    await screen.shot('returning_and_saving')


    await page.click('section .ember-view');
    await new Promise(r => setTimeout(r, 1000));
    await screen.shot('end')


    //Finalizar la prueba
    console.log('Ok Scenario: Publish post')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
