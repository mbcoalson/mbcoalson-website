import { test, expect } from '@playwright/test';

const route = '/essays/freedom-is-more-than-what-we-can-buy/';
const title = 'Freedom Is More Than What We Can Buy';
const authors = 'Mat Coalson & GPT-6.1 Sol (OpenAI)';

test('approved freedom essay is published with visible Sol credit', async ({ page }) => {
  const response = await page.goto(`${route}?source=publication-check#article`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`${title} — Mat Coalson`);
  await expect(page.locator('article h1')).toHaveCount(1);
  await expect(page.locator('article h1')).toHaveText(title);
  await expect(page.locator('article header .byline')).toHaveText(authors);
  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `https://mbcoalson.com${route}`);
  await expect(page.locator('article')).toContainText('ignorance can no longer masquerade as inevitability');
  await expect(page.locator('article')).toContainText('needless insecurity is a moral failure');
  await expect(page.locator('article')).not.toContainText(/precarity|so easily|working draft|v0\.2|AthenaVault/i);
});

test('Writing lists the freedom essay first with its Sol credit', async ({ page }) => {
  await page.goto('/writing/');
  const link = page.getByRole('link', { name: title, exact: true });
  await expect(link).toHaveAttribute('href', route.slice(0, -1));
  await expect(link.locator('xpath=ancestor::article').locator('.byline')).toHaveText(authors);
  await expect(page.locator('.essay-list').first().locator('h2 a').first()).toHaveText(title);
});
