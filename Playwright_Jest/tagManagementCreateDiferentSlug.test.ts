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

const dataTag = require('../fixtures/tag_validate.json');


function generateRandomArr(length:number, max:number, min:number) {
    let arrayNumbers:Array<number>=[];
    for (let i = 0; i < length; i++) {
        let newNumber = Math.floor(Math.random() * (max - min)) + min;
        arrayNumbers.includes(newNumber) ? length += 1 : arrayNumbers.push(newNumber);
    }
    return arrayNumbers;
}



 const indexPool= generateRandomArr(30,dataTag.length-1,0);
//  const indexPoolApi= generateRandomArr(10,10-1,0);


 
const stages = [

    {"stage":1,
    "testDescription":"Should create tag with description",
    "nameTag":dataTag[indexPool[1]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": "",
    "descriptionTag":dataTag[indexPool[1]].description,
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":2,
    "testDescription":"Should create tag without description ",
    "nameTag":dataTag[indexPool[2]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": "",
    "descriptionTag":"",
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":3,
    "testDescription":"Should not create tag without name  ",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": "",
    "descriptionTag":dataTag[indexPool[3]].description,
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },   

    {"stage":4,
    "testDescription":"Should not create tag without name & with  meta title ",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": "",
    "descriptionTag":dataTag[indexPool[4]].description,
    "meta_title":dataTag[indexPool[4]].meta_title,
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":5,
    "testDescription":"Should not create tag without name & with meta title & meta description ",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": "",
    "descriptionTag":dataTag[indexPool[5]].description,
    "meta_title":dataTag[indexPool[5]].meta_title,
    "meta_description":dataTag[indexPool[5]].meta_description,
    "meta_url":'',
    },

    {"stage":6,
    "testDescription":"Should create tag with description & color",
    "nameTag":dataTag[indexPool[6]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[6]].color,
    "descriptionTag":dataTag[indexPool[6]].description,
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":7,
    "testDescription":"Should create tag without description  & color",
    "nameTag":dataTag[indexPool[7]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[7]].color,
    "descriptionTag":"",
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":8,
    "testDescription":"Should not create tag without name & with color ",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[8]].color,
    "descriptionTag":dataTag[indexPool[8]].description,
    "meta_title":'',
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":9,
    "testDescription":"Should not create tag without name & with meta title & color ",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[9]].color,
    "descriptionTag":dataTag[indexPool[9]].description,
    "meta_title":dataTag[indexPool[9]].meta_title,
    "meta_description":'',
    "meta_url":'',
    },

    {"stage":10,
    "testDescription":"Should not create tag without name & with meta description & color",
    "nameTag":'',
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[10]].color,
    "descriptionTag":dataTag[indexPool[10]].description,
    "meta_title":dataTag[indexPool[10]].meta_title,
    "meta_description":dataTag[indexPool[10]].meta_description,
    "meta_url":'',
    },

    {"stage":11,
    "testDescription":"Should create Tag with all principal & meta_data fill",
    "nameTag":dataTag[indexPool[11]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[11]].color,
    "descriptionTag":dataTag[indexPool[11]].description,
    "meta_title":dataTag[indexPool[11]].meta_title,
    "meta_description":dataTag[indexPool[11]].meta_description,
    "meta_url":dataTag[indexPool[11]].canonical_url,
    },

    {"stage":12,
    "testDescription":"Should not create Tag with all principal & meta_data fill & wrong meta_url",
    "nameTag":dataTag[indexPool[12]].name,
    "slug": dataTag[indexPool[1]].slug,
    "color": dataTag[indexPool[12]].color,
    "descriptionTag":dataTag[indexPool[12]].description,
    "meta_title":dataTag[indexPool[12]].meta_title,
    "meta_description":dataTag[indexPool[12]].meta_description,
    "meta_url":dataTag[indexPool[12]].slug,
    },
]

describe('Launch Tag tests', () => {

    stages.forEach((st)=>{

        const pathScreenshotsTest =`../${nameScreenPath}/${titleTest}/stage_${st.stage}/`

        test(st.testDescription, async () => {

            //Contenido de la prueba
            //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
            const browser = await chromium.launch({
            })

            const context = await browser.newContext();
            const page = await context.newPage();
            
            const loginPage = new LoginPage(page, url, userEmail, userPassword);
            const screen = new Screen(page,pathScreenshotsTest,version);
            const newTag = new NewTag(page,screen);

            let nameTag = st.nameTag;
            let descriptionTag = st.descriptionTag;
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
    });    
})