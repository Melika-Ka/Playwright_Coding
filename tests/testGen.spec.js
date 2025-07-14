import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).fill('playwright');
  await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).click();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('button', { name: 'Playwright Test' }).click();
  await page.getByRole('link', { name: 'Library' }).click();
  await page.getByRole('tab', { name: 'JavaScript' }).first().click();
});