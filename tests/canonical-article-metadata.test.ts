import { test, expect } from '@playwright/test';

const articleCanonicals = [
  ['/citizen-scientist/build-it-better/', 'https://mbcoalson.com/citizen-scientist/build-it-better/'],
  ['/citizen-scientist/behavioral-variance-multi-agent/', 'https://mbcoalson.com/citizen-scientist/behavioral-variance-multi-agent/'],
  ['/citizen-scientist/llms-are-probabilistic/', 'https://mbcoalson.com/citizen-scientist/llms-are-probabilistic/'],
  ['/essays/the-age-of-jazz/', 'https://mbcoalson.com/essays/the-age-of-jazz/'],
] as const;

test('published articles expose one absolute canonical URL without request query or fragment', async ({ page }) => {
  for (const [route, canonical] of articleCanonicals) {
    await page.goto(`${route}?source=canonical-test#article`);
    const links = page.locator('head link[rel="canonical"]');
    await expect(links).toHaveCount(1);
    await expect(links).toHaveAttribute('href', canonical);
  }
});

test('offline calculator route does not gain an article canonical URL', async ({ page }) => {
  await page.goto('/projects/retrofit-scenario-review/');
  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(0);
});
