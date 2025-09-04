import { expect, test } from "@playwright/test";

test(" Unique GetBy Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  //   https://playwright.dev/docs/locators#locate-by-label
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Password").fill("abc123");
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Success! The Form has been submitted successfully!.")
  ).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
});
