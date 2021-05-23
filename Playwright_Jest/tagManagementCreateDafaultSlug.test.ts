import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import {Screen} from "./screen";
// import {DataPool} from "./data-pool";


var assert = require('assert');
const config = require('../playwright_properties.json');

const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "tagManagementCreateDafaultSlug"

const ghostUrl = config.ghostUrl
const userEmail = config.user
const userPassword = config.password
const url = `${ghostUrl}/ghost/#/signin`;

const dataTag = require('../fixtures/tag_validate.json');



// const dataPool= new DataPool()

// const dataTagApi = dataPool.getData()

// console.log(dataTagApi)

function generateRandomArr(length:number, max:number, min:number) {
    let arrayNumbers:Array<number>=[];
    for (let i = 0; i < length; i++) {
        let newNumber = Math.floor(Math.random() * (max - min)) + min;
        arrayNumbers.includes(newNumber) ? length += 1 : arrayNumbers.push(newNumber);
    }
    return arrayNumbers;
}



 const indexPool= generateRandomArr(20,dataTag.length-1,0);
//  const indexPoolApi= generateRandomArr(10,10-1,0);


 
const stages = [

    {"stage":1,
    "testDescription":"Should create tag with description",
    "nameTag":dataTag[indexPool[1]].name,
    "color": "",
    "descriptionTag":dataTag[indexPool[1]].description,
    "meta_title":'',
    "meta_description":'',
    },

    {"stage":2,
    "testDescription":"Should create tag without description ",
    "nameTag":dataTag[indexPool[2]].name,
    "color": "",
    "descriptionTag":"",
    "meta_title":'',
    "meta_description":'',
    },

    {"stage":3,
    "testDescription":"Should not create tag without name  ",
    "nameTag":'',
    "color": "",
    "descriptionTag":dataTag[indexPool[3]].description,
    "meta_title":'',
    "meta_description":'',
    },   

    {"stage":4,
    "testDescription":"Should not create tag without name & with  meta title ",
    "nameTag":'',
    "color": "",
    "descriptionTag":dataTag[indexPool[4]].description,
    "meta_title":dataTag[indexPool[4]].meta_title,
    "meta_description":'',
    },

    {"stage":5,
    "testDescription":"Should not create tag without name & with meta title & meta description ",
    "nameTag":'',
    "color": "",
    "descriptionTag":dataTag[indexPool[5]].description,
    "meta_title":dataTag[indexPool[5]].meta_title,
    "meta_description":dataTag[indexPool[5]].meta_description,
    },

    {"stage":6,
    "testDescription":"Should create tag with description & color",
    "nameTag":dataTag[indexPool[6]].name,
    "color": dataTag[indexPool[6]].color,
    "descriptionTag":dataTag[indexPool[6]].description,
    "meta_title":'',
    "meta_description":'',
    },

    {"stage":7,
    "testDescription":"Should create tag without description  & color",
    "nameTag":dataTag[indexPool[7]].name,
    "color": dataTag[indexPool[7]].color,
    "descriptionTag":"",
    "meta_title":'',
    "meta_description":'',
    },

    {"stage":8,
    "testDescription":"Should not create tag without name & with color ",
    "nameTag":'',
    "color": dataTag[indexPool[8]].color,
    "descriptionTag":dataTag[indexPool[8]].description,
    "meta_title":'',
    "meta_description":'',
    },

    {"stage":9,
    "testDescription":"Should not create tag without name & with meta title & color ",
    "nameTag":'',
    "color": dataTag[indexPool[9]].color,
    "descriptionTag":dataTag[indexPool[9]].description,
    "meta_title":dataTag[indexPool[9]].meta_title,
    "meta_description":'',
    },

    {"stage":10,
    "testDescription":"Should not create tag without name & with meta description & color",
    "nameTag":'',
    "color": dataTag[indexPool[10]].color,
    "descriptionTag":dataTag[indexPool[10]].description,
    "meta_title":dataTag[indexPool[10]].meta_title,
    "meta_description":dataTag[indexPool[10]].meta_description,
    },

    // {"stage":4,
    // "testDescription":"Should not create tag with null name ",
    // "nameTag":'',
    // "descriptionTag":dataTagApi[indexPoolApi[3]].description,
    // },
]

describe('Launch Tag tests', () => {


    stages.forEach((st)=>{

        const pathScreenshotsTest =`../${nameScreenPath}/${titleTest}/stage_${st.stage}/`

        test(st.testDescription, async () => {
            
            
            
            //Contenido de la prueba
            //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
            const browser = await chromium.launch({
                // headless: false
            })
            
            const context = await browser.newContext();
            const page = await context.newPage();
            
            const loginPage = new LoginPage(page, url, userEmail, userPassword);
            const screen = new Screen(page,pathScreenshotsTest,version);
            const newTag = new NewTag(page,screen);
            
            let nameTag = st.nameTag;
            let descriptionTag = st.descriptionTag;
            let color =  st.color;
            let meta_title= st.meta_title;
            let meta_description= st.meta_description;
            
            //Abrir la URL a probar en la página singin y dirigirse a Tag
            await loginPage.login();
            await screen.shot('login')
            
            //Interactuar con la aplicación web: Crear nuevo Tag
            
            await newTag.clickNewTag();
            await screen.shot('goToTag')
            
            await newTag.fillNameTag(nameTag);
            await newTag.fillNameDescription(descriptionTag);
            await newTag.fillColorTag(color);
            await screen.shot("fillData");
            
            await newTag.clickExpandMetaTag();
            await newTag.fillNameMetaTitle(meta_title)
            await newTag.fillNameDescription(meta_description)
            await screen.shot("fillMetaData");
            
            await newTag.clickSaveTag()
            await screen.shot('isSaveFillTag')
            //Verification 
            await page.click("text=Tags");
            let feedback = await page.$(`text=${nameTag}`);
            
            await screen.shot('seeCreated')
            
            //Finalizar la prueba
            await browser.close();
        }, 90000)
    });

})