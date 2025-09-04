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
  console.log(count);

  for (let i = 0; i < count; i++) {
    await productList[i].locator("text= Add To Cart").click();
  }
  // await productList.last().locator("text= Add To Cart").click();
});
