//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');
const playwright = require('playwright');
const config = require('../playwright_properties.json');
const {Screen} = require('./models/screen')

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "postManagementSearchDraftPosts"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Search draf posts')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
   const navigator = new Navigate(page);
const screen = new Screen(page,pathScreenshotsTest,version);
    await loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await navigator.clickOnSidebar('posts')
    await screen.shot('visit_posts')

    // // Buscar todo los bosquejos de los posts
    await page.click('text=All Posts ');
    await new Promise(r => setTimeout(r, 1000));
    await screen.shot('click_all_posts')


    await page.click('text=Draft Posts ');
    await new Promise(r => setTimeout(r, 1000));
    await screen.shot('see_draft_posts')


    //Finalizar la prueba
    console.log('Ok Scenario: Search draf posts')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
