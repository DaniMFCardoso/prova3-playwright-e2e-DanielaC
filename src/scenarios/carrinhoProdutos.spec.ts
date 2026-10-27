
import { test } from '@playwright/test';
import CarrinhoPage from '../support/pages/CarrinhoPage';

test.describe('Cadastro de produtos no carrinho - Sephora', () => {
  let carrinhoPage: CarrinhoPage;

  const BASE_URL = 'https://www.sephora.com.br/';

  const URL_PRODUTO =
    'https://www.sephora.com.br/feito-strengthening-face-250g-512405.html';

  test.beforeEach(async ({ page }) => {
    carrinhoPage = new CarrinhoPage(page);

    await page.goto(BASE_URL);
    await carrinhoPage.aceitarCookies();
  });

  test('CT01 - Adicionar produto ao carrinho', async () => {
    await carrinhoPage.acessarProduto(URL_PRODUTO);
    await carrinhoPage.adicionarProdutoSacola();
    await carrinhoPage.validarProdutoAdicionado();
  });

  test('CT02 - Validar carrinho vazio', async () => {
    await carrinhoPage.abrirSacola();
    await carrinhoPage.validarSacolaVazia();
  });

  test('CT03 - Validar produto na sacola', async () => {
    await carrinhoPage.acessarProduto(URL_PRODUTO);
    await carrinhoPage.adicionarProdutoSacola();
    await carrinhoPage.abrirSacola();

    await expect(
      carrinhoPage.carrinhoElements
        .getLinkProdutoNaSacola()
        .first()
    ).toBeVisible();
  });
});
