import { test, expect } from '@playwright/test';

test('validar campos obrigatorios - modal ', async ({ page }) => {
  await page.goto('https://easyjur.com/');

  await expect(page).toHaveTitle(/Easyjur Software jurídico/);

  await page.getByRole('button', { name: 'Aceitar' }).click();

  await page.getByRole('button', { name: 'Teste Grátis' }).click();

  //await expect(page.locator('//h2[text()="Solicite seu teste grátis!"]')).toBeVisible();

  //await expect(page.getByText('Solicite seu teste grátis!')).toBeVisible();

  await expect(page.getByRole('dialog', { name: 'Popup CTA' })).toBeVisible();
});