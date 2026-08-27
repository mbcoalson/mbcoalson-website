import { test, expect } from '@playwright/test';

test('privacy page loads', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page).toHaveTitle(/Privacy Policy.*Mat Coalson/);
});

test('privacy page has contact email', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.locator('a[href="mailto:matt.coalson@gmail.com"]')).toBeVisible();
});

test('privacy page covers the Nest integration disclosures', async ({ page }) => {
  await page.goto('/privacy');
  const body = page.locator('.policy');
  await expect(body).toContainText('Smart Device Management API');
  await expect(body).toContainText('not sold, shared, or transmitted to any third party');
  await expect(body).toContainText('processed locally on personal infrastructure');
});

test('privacy page is linked from the footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href="/privacy"]')).toBeVisible();
});

test('privacy is NOT in main nav', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="/privacy"]')).toHaveCount(0);
});
