import { test, expect } from "@playwright/test";

test("mini projet", async ({ page }) => {
  const emailAddress = "melika.karimi.work@gmail.com";
  const password = "Meli@123";
  const productList = await page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(emailAddress);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();
  await productList.last().waitFor({ state: "visible" });
  const count = await productList.count();
  // console.log(count);
  await productList.last().locator("text= Add To Cart").click();
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

  // https://playwright.dev/docs/api/class-page#page-wait-for-load-state
  await page.locator(".infoWrap").first().waitFor();

  // https://playwright.dev/docs/api/class-selectors
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
});
