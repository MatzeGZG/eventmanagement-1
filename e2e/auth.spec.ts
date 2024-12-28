import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login flow', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('ValidPassword123!');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await expect(page.getByText(/welcome back/i)).toBeVisible();
  });

  test('signup flow', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('ValidPassword123!');
    await page.getByRole('button', { name: /create account/i }).click();
    
    await expect(page.getByText(/welcome to funjettsetter/i)).toBeVisible();
  });
});