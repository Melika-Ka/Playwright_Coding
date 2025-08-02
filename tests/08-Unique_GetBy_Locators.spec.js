import { expect, test } from "@playwright/test";

test(" Unique GetBy Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  //   https://playwright.dev/docs/locators#locate-by-label
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
});
