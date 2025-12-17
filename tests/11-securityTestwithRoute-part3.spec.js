import { test, expect } from "@playwright/test";

test("security test with route - part3", async ({ page }) => {
  console.log("hello");
  const emailAddress = "melika.karimi.work@gmail.com";
  const password = "Meli@123";
  const productList = await page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(emailAddress);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();
  await productList.last().waitFor({ state: "visible" });
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6930183332ed8658711cbc2b",
      })
  );
  await page.locator("tr.ng-star-inserted .btn-primary").first().click();
  await expect(page.locator("p.blink_me")).toHaveText(
    "You are not authorize to view this order"
  );
});
