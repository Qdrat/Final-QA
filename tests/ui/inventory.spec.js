import { test, expect } from '../../src/fixtures/auth.fixture'

test.describe('inventory', () => {
    test('TC-09. Отображение списка товаров после логина', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
    }) => {
        await expect(inventoryPage.getProductList()).toBeVisible()
        await expect(inventoryPage.getFirstProduct()).toBeVisible()
    })

    test('TC-10. Переход на страницу товара по клику на название/изображение', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
        productDetailPage,
        page,
    }) => {
        await inventoryPage.openFirstProduct()
        await expect(page).toHaveURL(/\/product\/\d+/)
        await expect(productDetailPage.getProductName()).toBeVisible()
    })

    test('TC-11. Добавление товара в корзину из каталога', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
    }) => {
        await inventoryPage.addToCartByName('Keychron K2')
        await expect(
            inventoryPage.toast(/товар добавлен в корзину/i)
        ).toBeVisible()
    })
})
