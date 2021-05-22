import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import {Screen} from "./screen";

const titleTest = "tagManagementCreateDiferentSlug"
const config = require('../playwright_properties.json');

const nameScreenPath=config.nameScreenPath
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`
const version= `${config.version}_`


const ghostUrl = config.ghostUrl
const userEmail = config.user
const userPassword = config.password
const url = `${ghostUrl}/ghost/#/signin`;

describe('Launch Tag tests', () => {

    test('Crea tag con Diferent Slug Tag', async () => {

        //Contenido de la prueba
        
        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await chromium.launch({
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const loginPage = new LoginPage(page, url, userEmail, userPassword);
        const newTag = new NewTag(page);
        const screen = new Screen(page,pathScreenshotsTest,version);

        let nameTag = "Example name Tag 2"
        let descriptionTag = `this is an example name description 2 `
        let nameSlugTag= 'Diferent Slug Name'
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        await loginPage.login();
        await screen.shot('login')
        
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        await screen.shot('goToTag')

        await newTag.fillNameTag(nameTag);
        await newTag.fillNameSlug(nameSlugTag);
        await newTag.fillNameDescription(descriptionTag);
        await newTag.clickSaveTag()
        await screen.shot('saveFillTag')
        
        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${nameTag}`);
        let feedbackSlug = await page.$(`text='example-name-tag-2diferent-slug-name'`);
        await screen.shot('loseeNewTaggin')

        //Finalizar la prueba
        await browser.close();
    }, 90000)
})