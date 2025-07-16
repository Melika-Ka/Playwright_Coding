import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("hello");
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .press("Enter");
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page.getByText("Mark all as complete").click();
  await page.getByRole("checkbox", { name: "Toggle Todo" }).uncheck();
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("todo");
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .press("Enter");
  await page
    .getByRole("listitem")
    .filter({ hasText: "todo" })
    .getByLabel("Toggle Todo")
    .check();
});
