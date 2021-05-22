class Screen {
    constructor(page,pathScreenshots,version='') {
        this.page = page;
        this.pathScreenshots = pathScreenshots;
        this.version = version
      }

      countShots= 0;

      async shot(label=''){
        await this.page.screenshot({path:`${this.pathScreenshots}./${this.version}_${this.countShots}_${label}.png` })
        this.countShots++
      }
}

module.exports = { Screen };
