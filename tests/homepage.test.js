// @ts-check

const { test, expect } = require('@playwright/test');

// Test if the page has the expected title.
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/Pickleball-Scheduler');
  await expect(page).toHaveTitle(/Pickleball Scheduler/);
});

// Test if the page displays expected heading.
test('has heading displayed', async ({ page }) => {
  await page.goto('http://localhost:3000/Pickleball-Scheduler');
  await expect(page.getByRole('heading', { name: 'Pickleball Scheduler' })).toBeVisible();
});

// Sample test
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
