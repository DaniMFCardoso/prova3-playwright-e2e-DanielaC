
import { Page, expect } from '@playwright/test';
import CarrinhoElements from '../elements/CarrinhoElements';
import BasePage from './BasePage';

export default class CarrinhoPage extends BasePage {
  readonly carrinhoElements: CarrinhoElements;

  constructor(readonly page: Page) {
    super(page);
    this.carrinhoElements = new CarrinhoElements(page);
  }

  async aceitarCookies(): Promise<void> {
    const botao =
      this.carrinhoElements.getBotaoAceitarCookies();

    if (await botao.isVisible().catch(() => false)) {
      await botao.click();
    }
  }

  async acessarProduto(urlProduto: string): Promise<void> {
    await this.page.goto(urlProduto, {
      waitUntil: 'domcontentloaded',
    });

    await this.aceitarCookies();

    await expect(
      this.carrinhoElements.getTituloProduto()
    ).toBeVisible();
  }

  
async adicionarProdutoSacola(): Promise<void> {
  const botao =
    this.carrinhoElements.getBotaoAdicionarSacola();

  await expect(botao).toBeVisible();
  await expect(botao).toBeEnabled();

  // Rola até o botão, posicionando-o no centro da tela.
  await botao.scrollIntoViewIfNeeded();

  try {
    // Prioriza o clique normal, respeitando as verificações do Playwright.
    await botao.click({ timeout: 5000 });
  } catch {
    // Se o cabeçalho interceptar o clique, tenta novamente
    // após rolar o botão para o centro da página.
    await this.page.evaluate(() => {
      window.scrollBy(0, 250);
    });

    await botao.scrollIntoViewIfNeeded();

    // O clique forçado é usado somente como alternativa.
    await botao.click({ force: true });
  }
}


  async abrirSacola(): Promise<void> {
    await this.page.goto(
      'https://www.sephora.com.br/checkout/cart/',
      { waitUntil: 'domcontentloaded' }
    );

    await this.aceitarCookies();

    console.log('URL após abrir sacola:', this.page.url());
    console.log('Título:', await this.page.title());

    console.log(
      'Conteúdo:',
      (await this.page.locator('body').innerText())
        .slice(0, 3000)
    );

    await expect(
      this.carrinhoElements.getConteudoCarrinho()
    ).toBeVisible();
  }

  async validarProdutoAdicionado(): Promise<void> {
    await this.abrirSacola();

    await expect(
      this.carrinhoElements.getLinkProdutoNaSacola()
    ).toBeVisible();
  }

  async validarSacolaVazia(): Promise<void> {
    await this.abrirSacola();

    await expect(
      this.carrinhoElements.getMensagemSacolaVazia()
    ).toBeVisible();
  }
}
