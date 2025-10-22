import { test, expect, request } from "@playwright/test";
const loginPayLoad = {
  userEmail: "melika.karimi.work@gmail.com",
  userPassword: "Meli@123",
};
let token;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginDataJson = await loginResponse.json();
  console.log(loginDataJson);
  token = await loginDataJson.token;
  console.log("token", token);
});

test("mini projet", async ({ page }) => {
  const emailAddress = "melika.karimi.work@gmail.com";
  const password = "Meli@123";
  const productList = page.locator(".card-body");
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");

  //  removing :

  // await page.locator("#userEmail").fill(emailAddress);
  // await page.locator("#userPassword").fill(password);
  // await page.locator("#login").click();
  // await productList.last().waitFor({ state: "visible" });
  await productList
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add To Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.locator(".infoWrap").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
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

  let orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  orderID = orderID.split(" ")[2];
  console.log(orderID);
  ///
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.locator("tbody .ng-star-inserted").first().waitFor();
  await page
    .locator("tbody .ng-star-inserted")
    .filter({ toHaveText: orderID })
    .locator("button")
    .first()
    .click();
  const orderIdReview = page.locator(".row .col-text");
  await expect(orderIdReview).toContainText(orderID);
});
