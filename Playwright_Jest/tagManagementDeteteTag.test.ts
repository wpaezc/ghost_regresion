import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import {Screen} from "./screen";
import { SelectTag } from './selectTag';

const config = require('../playwright_properties.json');
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath



const titleTest = "tagManagementDeteteTag"
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
        const newTag = new NewTag(page);
        const screen = new Screen(page,pathScreenshotsTest,version);
        const selectedTag = new SelectTag(page);

        let nameTag = "To_Delete_Title_Tag"
        let descriptionTag = `This is  the Description of ${nameTag}`
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        
        await loginPage.login();
        await screen.shot('login')
        
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        await screen.shot('goToCreateTag')
        await newTag.fillNameTag(nameTag);
        await newTag.fillNameDescription(descriptionTag);
        await newTag.clickSaveTag();
        await screen.shot(`See_${nameTag}`)

        await page.click("text=Tags");
        
       
        
        //Delete Name Tag
        await selectedTag.clickTag(nameTag);

       
        await selectedTag.clickDeleteTag();
        

        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${nameTag}`);
        await screen.shot('seeNotTag')

        //Finalizar la prueba
        await browser.close();
    }, 90000)

})