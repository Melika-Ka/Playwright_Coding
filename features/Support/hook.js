import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
  BeforeStep,
  AfterStep,
  Status,
} from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

BeforeStep(async function ({ result }) {
  // This will run before each step
});
AfterStep(async function ({ result }) {
  // This will run after each step
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: `screenshot-${Date.now()}.png` });
  }
});
