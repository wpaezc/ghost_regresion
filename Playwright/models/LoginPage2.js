class LoginPage {
  constructor(page, url, user, password) {
    this.page = page;
    this.url = url;
    this.user = user;
    this.password = password;
  }

  urlLabs = 'http://localhost:2368/ghost/#/settings/labs';
  btnDeleteDialog = '//button[@class="gh-btn gh-btn-red gh-btn-icon ember-view"]//span[contains(text(),"Delete")]'

  async enter_ghost(delete_all = true) {
    await this.page.goto(this.url);
    await this.page.fill('id=ember8', this.user)
    await this.page.fill('id=ember10', this.password);
    await this.page.click('id=ember12');
    await new Promise(r => setTimeout(r, 1000));
    //   // await this.page.pause();
    //   if (delete_all) {
    //     await this.deleteAll()
    //   }
    // }

    // async deleteAll(){
    //   await Promise.all([
    //     this.page.waitForNavigation({url: this.urlLabs}),
    //     this.page.click('text=Labs')
    //   ]);
    //   // await this.page.pause();

    //   await this.page.click('button:has-text("Delete")');

    //   // Press Enter
    //   await this.page.click(this.btnDeleteDialog);
  }
}
module.exports = { LoginPage };