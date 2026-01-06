import { test, expect } from "@playwright/test";
import { log } from "console";
const { LoginClass } = require("../pageObject/loginPage");

test("mini projet", async ({ page }) => {
  const emailAddress = "melika.karimi.work@gmail.com";
  const password = "Meli@123";
  const productList = page.locator(".card-body");
  const loginClass = new LoginClass(page);
  await loginClass.goPage();

  await loginClass.validLogin(emailAddress, password);
  await productList.last().waitFor({ state: "visible" });
  const count = await productList.count();
  for (let i = 0; i < count; i++) {
    if (
      (await productList.nth(i).locator("b").textContent()) == "ZARA COAT 3"
    ) {
      await productList.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("button[routerlink='/dashboard/cart']").click();

  await page.locator(".infoWrap").first().waitFor();

  const is_visible = await page
    .locator("h3:has-text('ZARA COAT 3')")
    .isVisible();

  await expect(is_visible).toBeTruthy();

  await page.locator("button:has-text('Checkout')").click();
  await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  const contryList = page.locator(".ta-results");
  await contryList.waitFor({ state: "visible" });
  const countryItemsCount = await contryList.locator("button.ta-item").count();
  for (let i = 0; i < countryItemsCount; i++) {
    const countryText = await contryList
      .locator("button.ta-item")
      .nth(i)
      .textContent();
    if (countryText.trim().toLowerCase() === "india") {
      await contryList.locator("button.ta-item").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    emailAddress
  );
  await page.locator(".actions .action__submit").click();
  await expect(page.locator("h1.hero-primary")).toContainText(
    "Thankyou for the order."
  );

  // code for copy orderId
  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.locator("tbody .ng-star-inserted").first().waitFor();
  const orderCount = await page.locator("tbody .ng-star-inserted").count();
  for (let i = 0; i < orderCount; i++) {
    const orderCheckedID = await page
      .locator("tbody .ng-star-inserted")
      .nth(i)
      .locator("th")
      .textContent();

    if (orderID.includes(orderCheckedID)) {
      await page
        .locator("tbody .ng-star-inserted")
        .nth(i)
        .locator("button")
        .first()
        .click();
      break;
    }
  }
  const orderIdReview = await page.locator(".row .col-text").textContent();
  expect(orderID.includes(orderIdReview)).toBeTruthy();
});
