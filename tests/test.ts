import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Downing JCR' })).toBeVisible();
});

test('searching', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#page-content').getByRole('img').locator('use')).toBeVisible();
	await page.locator('body').press('Control+k');
	await page.getByPlaceholder('Search...').fill('jcr');
	await page.getByPlaceholder('Search...').press('Tab');
});
