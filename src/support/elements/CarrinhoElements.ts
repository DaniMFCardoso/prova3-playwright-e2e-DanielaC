
import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class CarrinhoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
  }

  getBotaoAceitarCookies(): Locator {
    return this.page.locator('#onetrust-accept-btn-handler');
  }

  getTituloProduto(): Locator {
    return this.page.locator('h1').first();
  }

  getBotaoAdicionarSacola(): Locator {
    return this.page.getByText('Adicionar à Sacola', {
      exact: true,
    }).first();
  }

  getBotaoSacola(): Locator {
    return this.page.locator(
      'a[data-auto-id="btn-finish-shop"]'
    );
  }

  getConteudoCarrinho(): Locator {
    return this.page.locator('body');
  }

  getLinkProdutoNaSacola(): Locator {
    return this.page.locator(
      'a[href*="feito-strengthening-face-250g-512405"]:visible'
    ).filter({
      hasText: /Hidratante Fortalecedor Feito Brasil Cocais/i,
    }).first();
  }

  getMensagemSacolaVazia(): Locator {
    return this.page.getByText(
      /sacola está vazia/i
    ).first();
  }
}
