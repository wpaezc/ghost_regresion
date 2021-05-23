import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import {Screen} from "./screen";
import { SelectTag } from './selectTag';

const config = require('../playwright_properties.json');
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath



const titleTest = "tagManagementEditTagSlug"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const ghostUrl = config.ghostUrl
const userEmail = config.user
const userPassword = config.password
const url = `${ghostUrl}/ghost/#/signin`;

describe('Launch Tag tests', () => {

    test('Edit Title Tag', async () => {

        //Contenido de la prueba
        
        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await chromium.launch({
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const loginPage = new LoginPage(page, url, userEmail, userPassword);
        const screen = new Screen(page,pathScreenshotsTest,version);
        const newTag = new NewTag(page,screen);
        const selectedTag = new SelectTag(page);

        let nameTag = "Original_Slug_Title_Tag"
        let descriptionTag = `This is  the Description of ${nameTag}`
        let nameSlugTag= 'Diferent Slug Name'
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        
        await loginPage.login();
        await screen.shot('login');
        
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        await screen.shot('goToCreateTag');
        await newTag.fillNameTag(nameTag);
        await newTag.fillNameDescription(descriptionTag);
        await newTag.clickSaveTag();
        await screen.shot('See_Slug_${nameTag}');
       
        
        //Edit Slug Tag
        await selectedTag.clickTag(nameTag);

        await selectedTag.deleteSlugTag();
        await selectedTag.fillSlugTag(nameSlugTag);
        await screen.shot(`New_slug_${nameTag}`);`
        `
        await selectedTag.clickSaveTag();
    

        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${nameSlugTag}`);
        
        await screen.shot('seeNewTag');

        //Finalizar la prueba
        await browser.close();
    }, 90000)

})