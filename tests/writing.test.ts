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

test('writing page has Citizen Scientist section', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.locator('text=Citizen Scientist').first()).toBeVisible();
});

test('citizen scientist entry links to detail page', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.locator('a[href*="/citizen-scientist/"]').first()).toBeVisible();
});

test('citizen scientist detail page loads', async ({ page }) => {
  await page.goto('/citizen-scientist/behavioral-variance-multi-agent');
  await expect(page).toHaveTitle(/Behavioral Variance.*Mat Coalson/);
});

test('citizen scientist detail page shows LinkedIn link', async ({ page }) => {
  await page.goto('/citizen-scientist/behavioral-variance-multi-agent');
  await expect(page.locator('a[href*="linkedin.com"]').last()).toBeVisible();
});
