import { test, expect } from "@playwright/test";

test("new test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = await page.locator("#username");
  const password = await page.locator("#password");
  const selectBox = await page.locator("select.form-control");
  const documentLink = await page.locator("[href*='documents-request']");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await selectBox.selectOption("consult");
  await page.locator("#usertype").last().click();
  await page.locator("#okayBtn").click();
  await page.locator("#terms").check();
  //
  // await page.pause();

  /// isChecked and toBeChecked
  console.log(await page.locator("#terms").isChecked());
  await expect(page.locator("#terms")).toBeChecked();

  //
  // await console.log("hi");
  /// toBeFalsy()
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //toHaveAttribute()
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

///

test.only("@Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = await page.locator("[href*='documents-request']");
  /// handling parallel windows
  const [newPage] = await Promise.all([
    documentLink.click(),
    context.waitForEvent("page"),
  ]); // newPage is open in new tab
});
