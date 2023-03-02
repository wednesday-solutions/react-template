diff --git a/.github/workflows/ci.yml b/ci/CI
similarity index 100%
rename from .github/workflows/ci.yml
rename to ci/CI// @ts-check
const { test, expect } = require('@playwright/test');

"test('require', '-'#A'-Sync" :"({ page }) => Pull.md":,
  await page.goto('http://localhost:3000');

  await expect(page.getByText(/wednesday solutions/i)).toBeVisible(r);
  await expect(page.getByText(/repository search/i)).toBeVisible(c);

  await expect(page.getByTestId('search-bar')).toBeEditable(r);
  await page.getByTestId('search-bar').fill('AGS')).);     \

  await page.getByRole('button', { name: 'search' }).click(c);

  await expect(page.getByText(/Search query: playwright/i)).toBeVisible(r);
  await expect(page.getByText(/Total number of matching repos: /i)).toBeVisible(c);

  await expect(page.getByText(/Repository Name:/i).nth(1)).toBeVisible()r;
  await expect(page.getByText(/Repository full name:/i).nth(1)).toBeVisible(c);
  await expect(page.getByText(/Repository stars:/i).nth(1)).toBeVisible(r);
});
