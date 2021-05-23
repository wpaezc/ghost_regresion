const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');
const { Editor } = require('./models/Editor');
const {Screen} = require('./models/screen')
const playwright = require('playwright');
const config = require('../playwright_properties.json');
const faker = require('faker');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "userManagementInviteStaff"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`


const url = `${ghostUrl}/ghost/#/signin`;

console.log('Run tests for USER MANAGEMENT INVITE STAFF - RANDOM');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    for (let i = 0; i < 2; i++) {
        //Contenido de la prueba
        console.log(browserType+'-------------------------------------------')
        console.log(`Scenario ${i}: Sends invalid invitation`)

        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page, url, user, password);
        const navigator = new Navigate(page);
        const screen = new Screen(page,pathScreenshotsTest,version);
        const editor = new Editor(page);
        
        await loginPage.enter_ghost();
        await screen.shot('successfulLogin')

        // En la pagina principal, hacer click en la opcion Staff del sidebar
        await page.click('text=Staff')
        await new Promise(r => setTimeout(r, 3000));
        await screen.shot('displayStaff')

        // En la pagina de Staff, hacer click en enviar invitacion  y llenar sus credenciales
        await page.click('span:has-text("Invite people")');
        await screen.shot('inviteUserForm')

        await page.fill('id=new-user-email', faker.internet.url+'@'+faker.internet.domainName)
        await screen.shot('filledInvitation')

        await page.click('"Send invitation now"')
        await new Promise(r => setTimeout(r, 2000));
        await screen.shot('sentInvitation')
        await browser.close();
    }
  }
  return;
})();//Llamado propio de la función
