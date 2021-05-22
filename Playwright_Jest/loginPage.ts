//Importar Playwright
import {Page, BrowserContext} from 'playwright';

export class LoginPage {
    
    constructor (
        // public context:BrowserContext,
        public page:Page,
        public url: string,
        public user: string,
        public password : string,
        ){}
        
        // deletdata= new DeleteData(this.page);

        urlLabs : string = 'http://localhost:2368/ghost/#/settings/labs';

        txtUserName : string = 'id=ember8';
        txtPassword : string = 'id=ember10';
        btnLogin : string = 'id=ember12';
        btnDeleteDialog: string = '//button[@class="gh-btn gh-btn-red gh-btn-icon ember-view"]//span[contains(text(),"Delete")]'

    //Login
    async login(delete_all=true){

        await this.page.goto(this.url);
        await this.page.fill(this.txtUserName,this.user);
        await this.page.fill(this.txtPassword,this.password);
        await this.page.click(this.btnLogin);
        // await this.page.pause();
        if (delete_all) {
            await this.deleteAll()
          }
    }

    async deleteAll(){
        await Promise.all([
          this.page.waitForNavigation({url: this.urlLabs}),
          this.page.click('text=Labs')
        ]);
        await this.page.pause();
        await this.page.click('button:has-text("Delete")');
        
        // Press Enter
        await this.page.click(this.btnDeleteDialog);
      }
}
