import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";

// setDefaultTimeout(60000);

// Before(async function () {
//   this.browser = await chromium.launch({ headless: false });
//   this.context = await this.browser.newContext();
//   this.page = await this.context.newPage();
// });

// FIX 1: Accepts the two {string} variables from your feature file dynamically
Given(
  "Login in website with {string} and {string}",
  async function (email, password) {
    this.emailAddress = email; // Store it for validation later

    await this.page.goto("https://rahulshettyacademy.com/client");
    await this.page.locator("#userEmail").fill(this.emailAddress);
    await this.page.locator("#userPassword").fill(password);
    await this.page.locator("#login").click();
  },
);

When("Add {string} to cart", async function (productName) {
  const productList = await this.page.locator(".card-body");
  await productList.last().waitFor({ state: "visible" });
  await productList
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();
});

Then("Verify {string} is added to cart", async function (productName) {
  await this.page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await this.page.locator(".infoWrap").first().waitFor();
  await expect(this.page.getByText(productName)).toBeVisible();
});

// FIX 2: Corrected the spelling from "vlaid" to "valid" to match the feature file
When("Enter valid detail and place the order", async function () {
  await this.page.getByRole("button", { name: "Checkout" }).click();
  await this.page.getByPlaceholder("Select Country").pressSequentially("ind");

  const contryList = this.page.locator(".ta-results");
  await contryList.waitFor({ state: "visible" });

  const countryItemsCount = await contryList.locator("button.ta-item").count();
  for (let i = 0; i < countryItemsCount; i++) {
    const countryText = await contryList
      .locator("button.ta-item")
      .nth(i)
      .textContent();
    if (countryText.trim().toLowerCase() === "india") {
      await contryList.locator("button.ta-item").nth(i).click();
      break;
    }
  }

  await expect(this.page.locator(".user__name").first()).toContainText(
    this.emailAddress,
  );

  await this.page.locator(".actions .action__submit").click();
  await expect(this.page.locator("h1.hero-primary")).toContainText(
    "Thankyou for the order.",
  );
});

Then("Verify the order is placed successfully", async function () {
  let orderID = await this.page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  orderID = orderID.split(" ")[2];
  console.log("Generated Order ID:", orderID);

  await this.page.locator('button[routerlink="/dashboard/myorders"]').click();
  await this.page.locator("tbody .ng-star-inserted").first().waitFor();

  await this.page
    .locator("tbody .ng-star-inserted")
    .filter({ hasText: orderID })
    .locator("button")
    .first()
    .click();

  const orderIdReview = await this.page.locator(".row .col-text");
  await expect(orderIdReview).toContainText(orderID);
});

// After(async function () {
//   if (this.browser) {
//     await this.browser.close();
//   }
// });

// run npx cucumber-js --tags "@invalidData"
Given("Go to login page", async function () {
  await this.page.goto("https://rahulshettyacademy.com/client");
});
When("Login with {string} and {string}", async function (email, password) {
  await this.page.locator("#userEmail").fill(email);
  await this.page.locator("#userPassword").fill(password);
  await this.page.locator("#login").click();
});
Then("Error {string} is displayed", async function (errorMessage) {
  await this.page.locator(".toast-message").waitFor({ state: "visible" });
  await expect(this.page.locator(".toast-message")).toContainText(errorMessage);
});
