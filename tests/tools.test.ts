import { test, expect } from '@playwright/test';

test('tools page loads', async ({ page }) => {
  await page.goto('/tools');
  await expect(page).toHaveTitle(/Tools.*Mat Coalson/);
});

test('tools page has four repo cards', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('.repo-card')).toHaveCount(4);
});

test('tools page has OpenStudio section', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('text=OpenStudio').first()).toBeVisible();
});

test('tools page OpenStudio section links to LinkedIn', async ({ page }) => {
  await page.goto('/tools');
  const linkedinLink = page.locator('.openstudio-note a[href*="linkedin.com"]');
  await expect(linkedinLink).toBeVisible();
});
