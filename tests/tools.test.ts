import { test, expect } from '@playwright/test';

test('tools page loads', async ({ page }) => {
  await page.goto('/tools');
  await expect(page).toHaveTitle(/Tools.*Mat Coalson/);
});

test('tools page has three repo cards', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('.repo-card')).toHaveCount(3);
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

test('tools page OpenStudio card links to correct GitHub URL', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('a[href*="running-openstudio-models"]')).toBeVisible();
});

test('tools page has Learning section', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('text=Learning').first()).toBeVisible();
});

test('tools page Learning section has HF Agents Course link', async ({ page }) => {
  await page.goto('/tools');
  await expect(page.locator('a[href*="huggingface.co/agents-course"]')).toBeVisible();
});
