import { test, expect } from "@playwright/test";

test("new test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = await page.locator("#username");
  const password = await page.locator("#password");
  const selectBox = await page.locator("select.form-control");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await selectBox.selectOption("consult");
  await page.locator("#usertype").last().click();
  await page.locator("#okayBtn").click();
  //
  await page.pause();
});
