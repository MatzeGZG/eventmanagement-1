import { test, expect } from '@playwright/test';

test.describe('Map Features', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/');
    // Add login steps here
  });

  test('shows events on map', async ({ page }) => {
    await page.goto('/map');
    await expect(page.getByTestId('map-container')).toBeVisible();
    await expect(page.getByTestId('event-marker')).toBeVisible();
  });

  test('filters events by category', async ({ page }) => {
    await page.goto('/map');
    await page.getByRole('button', { name: /filter/i }).click();
    await page.getByRole('button', { name: /tech/i }).click();
    
    const markers = await page.getByTestId('event-marker').count();
    expect(markers).toBeGreaterThan(0);
  });
});