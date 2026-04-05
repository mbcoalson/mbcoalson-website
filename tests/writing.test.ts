import { test, expect } from '@playwright/test';

test('writing page loads', async ({ page }) => {
  await page.goto('/writing');
  await expect(page).toHaveTitle(/Writing.*Mat Coalson/);
});

test('writing page has a link to Water Rising', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.locator('a[href="/water-rising"]')).toBeVisible();
});

test('writing page shows essay list or empty state — not blank', async ({ page }) => {
  await page.goto('/writing');
  const hasEssays = (await page.locator('article').count()) > 0;
  const hasEmpty  = (await page.locator('[data-empty]').count()) > 0;
  expect(hasEssays || hasEmpty).toBe(true);
});
