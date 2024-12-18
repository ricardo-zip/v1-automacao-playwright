import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home';
import selectors from './fixtures/selectors.json';
import { faker } from '@faker-js/faker';

let homePage: HomePage

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page)
  await homePage.acessarPaginaWeb()
  await expect(page).toHaveTitle(/Easyjur Software jurídico/);
  await homePage.cliqueButtonHome('Teste Grátis');
  await expect(page.getByRole('dialog', { name: 'Popup CTA' })).toBeVisible();
})

test.describe('Modal - Teste Grátis', () => {
  test('Deve realizar uma solicitação de teste grátis realizada com sucesso', async ({ page }) => {
    await homePage.preencherCamposModal(selectors.input.firstname, faker.name.fullName());
    await homePage.selecionarOpcao(selectors.input.countryCode, 'BR');
    await homePage.preencherCamposModal(selectors.input.phone, faker.phone.number());
    await homePage.preencherCamposModal(selectors.input.email, faker.internet.email());
    await homePage.selecionarOpcao(selectors.input.positionOrFunction, 'Não sou Advogado');
    await homePage.selecionarOpcao(selectors.input.companySize, 'De 5 até 10 usuários');
    await homePage.selecionarOpcao(selectors.input.advocacyChallenge, 'Falta de Integração entre Sistemas');
    await homePage.selecionarOpcao(selectors.input.officeRevenue, 'Até 50 mil/ano');
    await homePage.selecionarOpcao(selectors.input.activeProcesses, 'Até 40 processos');
    await homePage.selecionarOpcao(selectors.input.demonstrationOption, 'Sim');
    await homePage.cliqueButtonModal('Solicite seu teste gratuitamente')
    await expect(page.getByText('Obrigado!')).toBeVisible();
  })

  test('Deve validar campos obrigatorios', async ({ page }) => {
    await homePage.cliqueButtonModal('Solicite seu teste')
    await homePage.validarMenssagemError(selectors.error.firstnameError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.phoneError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.emailError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.positionOrFunctionError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.companySizeError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.advocacyChallengeError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.officeRevenueError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.activeProcessesError, 'Preencha esse campo obrigatório');
    await homePage.validarMenssagemError(selectors.error.demonstrationOptionError, 'Preencha esse campo obrigatório');
  });
})
