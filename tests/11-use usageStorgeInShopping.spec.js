import { test, expect } from "@playwright/test";
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const emailAddress = "melika.karimi.work@gmail.com";
  const password = "Meli@123";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(emailAddress);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  //   https://playwright.dev/docs/auth#introduction
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("mini projet", async () => {
  const emailAddress = "melika.karimi.work@gmail.com";
  const page = await webContext.newPage();
  const productList = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");

  // await productList.last().waitFor({ state: "visible" });
  const count = await productList.count();
  // console.log(count);
  for (let i = 0; i < count; i++) {
    if (
      (await productList.nth(i).locator("b").textContent()) == "ZARA COAT 3"
    ) {
      await productList.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("button[routerlink='/dashboard/cart']").click();
  // await page.pause();

  await page.locator(".infoWrap").first().waitFor();

  const is_visible = await page
    .locator("h3:has-text('ZARA COAT 3')")
    .isVisible();

  // https://playwright.dev/docs/test-assertions
  await expect(is_visible).toBeTruthy();

  await page.locator("button:has-text('Checkout')").click();
  // https://playwright.dev/docs/api/class-locator#locator-press-sequentially
  await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  const contryList = await page.locator(".ta-results");
  await contryList.waitFor({ state: "visible" });
  const countryItemsCount = await contryList.locator("button.ta-item").count();
  // console.log(countryItemsCount);
  for (let i = 0; i < countryItemsCount; i++) {
    const countryText = await contryList
      .locator("button.ta-item")
      .nth(i)
      .textContent();
    if (countryText.trim().toLowerCase() === "india") {
      // console.log("check");
      await contryList.locator("button.ta-item").nth(i).click();
      break;
    }
  }
  // await page.locator(".user__name [type='text']").first();
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    emailAddress
  );
  await page.locator(".actions .action__submit").click();
  // await page.pause();
  await expect(page.locator("h1.hero-primary")).toContainText(
    "Thankyou for the order."
  );

  // code for copy orderId
  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  // console.log(orderID);

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
