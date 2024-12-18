import { expect, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async acessarPaginaWeb() {
        await this.page.goto('/')
    }

    async cliqueButtonHome(name: string) {
        const buttonPadrao = this.page.getByRole('button', { name: `${name}` });
        await buttonPadrao.click();
    }

    async cliqueButtonModal(name: string) {
        const buttonSoliciteTesteGratuitamente = this.page.getByRole('dialog', { name: 'Popup CTA' }).contentFrame().getByRole('button', { name: `${name}` });
        await buttonSoliciteTesteGratuitamente.click();
    }

    async validarMenssagemError(elemento: string, mensagemErro: string) {
        const mensagemCampoObrigatorio = this.page.getByRole('dialog', { name: 'Popup CTA' }).contentFrame().locator(`${elemento}`).getByText(`${mensagemErro}`);
        await expect(mensagemCampoObrigatorio).toBeAttached();
    }

    async preencherCamposModal(elemento: string, dados: string) {
        const mensagemCampoObrigatorio = this.page.getByRole('dialog', { name: 'Popup CTA' }).contentFrame().locator(`${elemento}`);
        await mensagemCampoObrigatorio.fill(`${dados}`)
    }

    async selecionarOpcao(elemento: string, opcao: string) {
        const teste = this.page.getByRole('dialog', { name: 'Popup CTA' }).contentFrame().locator(`${elemento}`);
        await teste.selectOption(`${opcao}`);
    }
}