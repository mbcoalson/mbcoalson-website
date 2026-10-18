import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const articleCanonicals = ['essays', 'citizen-scientist'].flatMap(collection =>
  readdirSync(`src/content/${collection}`).filter(name => name.endsWith('.md')).flatMap(name => {
    const source = readFileSync(`src/content/${collection}/${name}`, 'utf8');
    if (/^draft:\s*true\s*$/m.test(source.split('---')[1])) return [];
    const route = `/${collection}/${name.replace(/\.md$/, '')}/`;
    return [[route, `https://mbcoalson.com${route}`]];
  })
);

test('built articles have correct canonicals and drafts are excluded', async () => {
  for (const [route, canonical] of articleCanonicals) {
    const html = readFileSync(`dist${route}index.html`, 'utf8');
    const tags = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || [];
    expect(tags).toHaveLength(1);
    expect(tags[0]).toContain(`href="${canonical}"`);
  }
  const writing = readFileSync('dist/writing/index.html', 'utf8');
  for (const collection of ['essays', 'citizen-scientist']) {
    for (const name of readdirSync(`src/content/${collection}`).filter(name => name.endsWith('.md'))) {
      const source = readFileSync(`src/content/${collection}/${name}`, 'utf8');
      if (!/^draft:\s*true\s*$/m.test(source.split('---')[1])) continue;
      const route = `/${collection}/${name.replace(/\.md$/, '')}`;
      expect(existsSync(`dist${route}/index.html`)).toBe(false);
      expect(writing).not.toContain(`href="${route}"`);
    }
  }
});

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
