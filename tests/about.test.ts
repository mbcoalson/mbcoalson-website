import { test, expect } from '@playwright/test';

test('about page loads', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveTitle(/About.*Mat Coalson/);
});

test('about page has LinkedIn link', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.links a[href*="linkedin.com"]')).toBeVisible();
});

test('about page has GitHub link', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.links a[href*="github.com"]')).toBeVisible();
});
