import { test, expect } from '@playwright/test';

const historicalCredits = [
  { route: '/essays/mike-memory-architecture/', title: 'The Dream is Sci-Fi. The Tech is Catching Up.', authors: 'Mat Coalson & Claude Sonnet 4.6 (Anthropic)' },
  { route: '/citizen-scientist/build-it-better/', title: 'Build It Better', authors: 'Mat Coalson, GPT-5.6 Sol & GPT-5.6 Terra (OpenAI)' },
];

for (const { route, title, authors } of historicalCredits) {
  test(`${title} shows its evidence-backed model credit`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('article header .byline')).toHaveText(authors);
    await expect(page.locator('article h1')).toHaveCount(1);
    await expect(page.locator('article h1')).toHaveText(title);
    await expect(page).toHaveTitle(new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `https://mbcoalson.com${route}`);
    await page.goto('/writing/');
    const link = page.getByRole('link', { name: title, exact: true });
    await expect(link).toHaveAttribute('href', route.slice(0, -1));
    await expect(link.locator('xpath=ancestor::article').locator('.byline')).toHaveText(authors);
  });
}

test('Jazz credits user-confirmed Opus without inventing a version', async ({ page }) => {
  await page.goto('/essays/the-age-of-jazz/');
  await expect(page.locator('article h1')).toHaveText('The Age of Jazz');
  await expect(page.locator('article header .byline')).toHaveText('Mat Coalson & Claude Opus (Anthropic)');
  await page.goto('/writing/');
  const link = page.getByRole('link', { name: 'The Age of Jazz', exact: true });
  await expect(link.locator('xpath=ancestor::article').locator('.byline')).toHaveText('Mat Coalson & Claude Opus (Anthropic)');
});
