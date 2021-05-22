import {Page, BrowserContext} from 'playwright';

export class NewTag {
    
    constructor (

        public page:Page,
        ){}

        urlTags: string = 'http://localhost:2368/ghost/#/tags';

        btnNewTag : string = "text='New tag'";
        txtNameTag: string = "input[name='name']";
        txtSlugTag: string = "input[name='slug']";
        txtDescriptionTag: string = "textarea[name='description']";
        txtMetaTitleTag: string = "input[name='metaTitle']";
        txtMetaDescriptionTag: string = "textarea[name='metaDescription']";
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

        async fillNameTag(nameTag:string){
            await this.page.fill(this.txtNameTag,nameTag);
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
        async clickSaveTag (){
            await this.page.click(this.btnSaveTag);
        }   














}
