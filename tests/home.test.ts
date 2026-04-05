import { test, expect } from '@playwright/test';

test('home page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Mat Coalson/);
});

test('home page has h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
});

test('home page has email signup form', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('home page has GitHub link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href*="github.com/mbcoalson"]')).toBeVisible();
});

test('nav has four links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav ul a')).toHaveCount(4);
});

test('footer has LinkedIn link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href*="linkedin.com"]')).toBeVisible();
});
