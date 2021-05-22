import {Page, BrowserContext} from 'playwright';

export class Screen {

    constructor(
        public page:Page,
        public pathScreenshots: string,
        public version: string ='',
    )
    {}
    countShots : number = 0;

    async shot(label=''){
        await this.page.screenshot({path:`${this.pathScreenshots}./${this.version}_${this.countShots}_${label}.png` })
        this.countShots++
      }
}
