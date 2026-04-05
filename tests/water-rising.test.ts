import { test, expect } from '@playwright/test';

test('water rising page loads', async ({ page }) => {
  await page.goto('/water-rising');
  await expect(page).toHaveTitle(/Water Rising.*Mat Coalson/);
});

test('water rising page has email signup', async ({ page }) => {
  await page.goto('/water-rising');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('water rising is NOT in main nav', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="/water-rising"]')).toHaveCount(0);
});

test('writing page links to water rising', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.locator('a[href="/water-rising"]')).toBeVisible();
});
