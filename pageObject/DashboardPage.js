class DashboardPage {
  constructor(page) {
    this.page = page;
    this.productList = page.locator(".card-body");
    this.cart = page.locator("button[routerlink='/dashboard/cart']");
  }
  async searchProduct(productName) {
    await this.productList.last().waitFor({ state: "visible" });
    const count = await this.productList.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.productList.nth(i).locator("b").textContent()) ==
        productName
      ) {
        await this.productList.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
