import {Page, BrowserContext} from 'playwright';
import { Screen } from './screen';

export class NewTag {
    
    constructor (

        public page:Page,
        public screen: Screen,
        ){}

        urlTags: string = 'http://localhost:2368/ghost/#/tags';

        btnNewTag : string = "text='New tag'";
        btnExpandMeta :string = '//section[contains(@class,"gh-canvas")]//section[1]//div[1]//div[2]//button[1]//span[1]';
        txtNameTag: string = "input[name='name']";
        txtSlugTag: string = "input[name='slug']";
        txtDescriptionTag: string = "textarea[name='description']";
        txtMetaTitleTag: string = "input[name='metaTitle']";
        txtColorTag:string = '//input[@name="accent-color"]';
        txtMetaDescriptionTag: string = "textarea[name='metaDescription']";
        txtMetaUrl: string = 'input[name="canonicalUrl"]';

        btnSaveTag: string = "text='Save'";

        async goToTag(){
            await Promise.all([
                this.page.waitForNavigation({url: this.urlTags}),
                this.page.click("text=Tags"),
              ]);
        }

        async clickNewTag(){
            await this.goToTag();
            // await this.page.pause();
            await this.page.click(this.btnNewTag);
        }

        async clickExpandMetaTag(){
            await this.page.click(this.btnExpandMeta);
        }
        
        
        async fillNameTag(nameTag:string){
            await this.page.fill(this.txtNameTag,nameTag);
        }
        
        async fillColorTag(color:string){
            await this.page.fill(this.txtColorTag,color);
        }
        
        async fillNameSlug(nameSlug:string){
            await this.page.fill(this.txtSlugTag,nameSlug);
        }
        async fillNameDescription(nameDescription:string){
            await this.page.fill(this.txtDescriptionTag,nameDescription);
        }


        async fillNameMetaTitle(nameMetaTitle:string){
            await this.page.fill(this.txtMetaTitleTag,nameMetaTitle);
        }
        async fillNameMetaDescription(nameMetaDescription:string){
            await this.page.fill(this.txtMetaDescriptionTag,nameMetaDescription);
        }
        async fillMetaUrl(metaUrl:string){
            await this.page.fill('input[name="canonicalUrl"]', metaUrl);
        }


        async clickSaveTag (){
            // await new Promise(r => setTimeout(r, 1000));
            // Save button:has-text("Retry") ?
            await this.page.click(this.btnSaveTag);
            
            
            const btnRetry = await this.page.$('button:has-text("Retry")')
            // console.log(btnRetry)

            if (btnRetry!=null){
                await this.screen.shot('ERR_can_not_save')
                 // Click text=Tags
                await this.page.click('text=Tags');
           
                await this.screen.shot('msj_leave')
                await this.page.click('button:has-text("Leave")');
            }
             
        }   














}
