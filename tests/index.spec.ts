import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.amazon.com.br/');

  await expect(page).toHaveTitle(/Amazon.com.br | Tudo pra você, de A a Z./);
});