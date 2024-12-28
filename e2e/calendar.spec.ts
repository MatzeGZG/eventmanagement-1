import { test, expect } from '@playwright/test';

test.describe('Calendar Features', () => {
  test('displays events in calendar view', async ({ page }) => {
    await page.goto('/calendar');
    await expect(page.getByTestId('calendar-grid')).toBeVisible();
    await expect(page.getByTestId('event-cell')).toBeVisible();
  });

  test('switches between calendar views', async ({ page }) => {
    await page.goto('/calendar');
    
    await page.getByRole('button', { name: /week/i }).click();
    await expect(page.getByTestId('week-view')).toBeVisible();
    
    await page.getByRole('button', { name: /day/i }).click();
    await expect(page.getByTestId('day-view')).toBeVisible();
  });
});