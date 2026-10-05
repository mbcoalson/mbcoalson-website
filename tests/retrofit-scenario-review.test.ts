import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const reviewPath = resolve(
  process.cwd(),
  'public/assets/retrofit-scenario-review/index.html',
);

test('sanitized retrofit review renders its fixed scenario comparison', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') console.log(`browser console error: ${message.text()}`);
  });

  await page.goto('/projects/retrofit-scenario-review/');

  await expect(page).toHaveTitle(/Residential Retrofit Scenario Review.*Mat Coalson/);
  await expect(page.getByRole('heading', { name: 'Residential Retrofit Scenario Review' })).toBeVisible();
  await expect(page.getByText('This is a sanitized decision-review artifact')).toBeVisible();

  const review = page.frameLocator('iframe[title="Residential retrofit scenario comparison"]');
  await expect(review.locator('#field')).toBeVisible();
  await expect(review.locator('#detail')).toContainText('Scenario');
  await expect(review.getByText('About this public review')).toBeVisible();
  await expect(review.getByText('This page compares a fixed set of precomputed scenarios.')).toBeVisible();
  await expect(review.locator('textarea, button:has-text("Copy"), button:has-text("Run this bundle")')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('sanitized retrofit review contains no agent handoff, export, or identifying location terms', () => {
  const html = readFileSync(reviewPath, 'utf8').toLowerCase();
  for (const forbidden of [
    'sendprompt', 'bundlespec', 'copy spec', 'paste it into chat', 'bridge-equipped',
    'workflow_steps', 'branch_from', 'bundle_id', 'matshouse', "mat's house",
    'littleton', 'marston', 'denver metro', 'localstorage', 'navigator.clipboard',
    'https://cdn.jsdelivr.net', 'xcel', 'power ahead',
  ]) {
    expect(html).not.toContain(forbidden);
  }
});
