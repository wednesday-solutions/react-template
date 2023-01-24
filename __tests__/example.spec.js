// @ts-check
const { test, expect } = require('@playwright/test');

test('example test case', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByText(/wednesday solutions/i)).toBeVisible();
  await expect(page.getByText(/repository search/i)).toBeVisible();

  await expect(page.getByTestId('search-bar')).toBeEditable();
  await page.getByTestId('search-bar').fill('playwright');

  await page.getByRole('button', { name: 'search' }).click();

  await expect(page.getByText(/Search query: playwright/i)).toBeVisible();
  await expect(page.getByText(/Total number of matching repos: /i)).toBeVisible();

  await expect(page.getByText(/Repository Name:/i).nth(1)).toBeVisible();
  await expect(page.getByText(/Repository full name:/i).nth(1)).toBeVisible();
  await expect(page.getByText(/Repository stars:/i).nth(1)).toBeVisible();
});
