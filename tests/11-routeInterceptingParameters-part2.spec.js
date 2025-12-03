import { test, expect, request } from "@playwright/test";
const APIUtils = require("./utils/APIUtils.js");

const loginPayLoad = {
  userEmail: "melika.karimi.work@gmail.com",
  userPassword: "Meli@123",
};
const orderPaLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};
let fakePayloadOrder = {
  data: [],
  message: "No Orders",
};
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const ApiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await ApiUtils.createOrder(orderPaLoad);
});

test("mini projet", async ({ page }) => {
  //line 12

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  // اما اگر می‌خواستی پاسخ واقعی را بگیری و تغییر بدهی:
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const fakeRequest = await page.request.fetch(route.request());
      // const fakeRequest = await page.request().fetch();
      let body = JSON.stringify(fakePayloadOrder);
      await route.fulfill({
        response: fakeRequest,
        body: body,
      });
    }
  );
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  // await page.locator("tbody .ng-star-inserted").first().waitFor();
  // await page
  //   .locator("tbody .ng-star-inserted")
  //   .filter({ toHaveText: response.orderId })
  //   .locator("button")
  //   .first()
  //   .click();
  // const orderIdReview = page.locator(".row .col-text");
  // await expect(orderIdReview).toContainText(response.orderId);
  await page.waitForResponse((response) =>
    response
      .url()
      .startsWith(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/"
      )
  );
  expect(page.locator(".mt-4.ng-star-inserted")).toContainText(
    "You have No Orders to show at this time."
  );
  console.log("Done");
});
