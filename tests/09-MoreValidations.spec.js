import { test, expect } from "@playwright/test";

test("Popup Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");
  //   https://playwright.dev/docs/api/class-page#page-go-back
  await page.goBack();
  //   https://playwright.dev/docs/api/class-page#page-go-forward
  await page.goForward();
});

test("more vlaidation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  expect(await page.locator("#displayed-text").isVisible()).toBeFalsy();
  console.log("Test passed");
});
