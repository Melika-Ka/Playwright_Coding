class LoginClass {
  constructor(page) {
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.loginButton = page.locator("#login");
  }
  async validLogin(emailAddress, password) {
    await this.userEmail.type(emailAddress);
    await this.userPassword.type(password);
    await this.loginButton.click();
  }
  async goPage() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
}
module.exports = { LoginClass };
