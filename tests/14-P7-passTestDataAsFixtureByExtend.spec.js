import { expect } from "@playwright/test";
const { customtest } = require("./utils/base-test");

customtest(`@Webs Client App login`, async ({ page, testDataForLogin }) => {
  await page.goto(
    "https://sabzlearn.ir/login/email/?after=https%3A%2F%2Fsabzlearn.ir%2F"
  );
  const notification = page.locator(".notification");
  await page.locator(".user-data__email").fill(testDataForLogin.email);
  await page.locator(".user-data__password").fill(testDataForLogin.password);

  await page.getByRole("button", { type: "submit" }).click();

  if (
    (await notification.textContent()) ==
    "کاربری با این ایمیل و رمز عبور یافت نشد."
  ) {
    console.log("کاربری با این ایمیل و رمز عبور یافت نشد.");
  } else {
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".user-profile")).toBeVisible();
    console.log("کاربر  با موفقیت وارد شد ");
  }
});
