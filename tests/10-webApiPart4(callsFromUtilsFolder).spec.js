import { test, expect, request } from "@playwright/test";
const APIUtils = require("./utils/APIUtils.js");

const loginPayLoad = {
  userEmail: "melika.karimi.work@gmail.com",
  userPassword: "Meli@123",
};
const orderPaLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const APIUtils = APIUtils(apiContext, loginPayLoad);
  response = APIUtils.createOrder(orderPaLoad);

  // const loginResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/auth/login",
  //   {
  //     data: loginPayLoad,
  //   }
  // );
  // expect(loginResponse.ok()).toBeTruthy();
  // const loginDataJson = await loginResponse.json();
  // console.log(loginDataJson);
  // token = await loginDataJson.token;
  // console.log("token", token);

  // const orderResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/order/create-order",
  //   {
  //     data: orderPaLoad,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   }
  // );
  // expect(orderResponse.ok()).toBeTruthy();
  // const orderDataJson = await orderResponse.json();
  // console.log("orderDataJson", orderDataJson);
  // orderId = await orderDataJson.orders[0];
  // console.log("orderId : ", orderId);
});

test("mini projet", async ({ page }) => {
  //line 12

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.locator("tbody .ng-star-inserted").first().waitFor();
  await page
    .locator("tbody .ng-star-inserted")
    .filter({ toHaveText: response.orderId })
    .locator("button")
    .first()
    .click();
  const orderIdReview = page.locator(".row .col-text");
  await page.pause();
  await expect(orderIdReview).toContainText(response.orderId);
});
