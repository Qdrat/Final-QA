import { test, expect } from '../../src/fixtures/auth.fixture'

test.describe('cart', () => {
    test('TC-12. Переход в корзину', async ({
        authenticatedPage: __authenticatedPage,
        inventoryPage,
        page,
    }) => {
        await inventoryPage.header.openCart()
        await expect(page).toHaveURL('./cart')
    })

    test('TC-13. Корректность состава корзины', async ({
        adminAuthenticatedPage: _adminAuthenticatedPage,
        inventoryPage,
        cartPage,
    }) => {
        await inventoryPage.addToCartByName('iPhone 15 Pro')
        await inventoryPage.addToCartByName('Dell UltraSharp')
        await inventoryPage.header.openCart()
        const itemNames = await cartPage.getItemNamesInCartList()

        expect(itemNames).toHaveLength(2)
        expect(itemNames).toContain('iPhone 15 Pro')
        expect(itemNames).toContain('Dell UltraSharp')
    })

    test('TC-14. Удаление товара из корзины', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
        cartPage,
    }) => {
        await inventoryPage.addToCartByName('iPhone 15 Pro')
        await inventoryPage.header.openCart()
        await cartPage.removeItemFromCart('iPhone 15 Pro')
        await expect(cartPage.toast(/товар удален из корзины/i)).toBeVisible()
        expect(await cartPage.getItemNamesInCartList()).not.toContain(
            'iPhone 15 Pro'
        )
    })

    test('TC-15. кнопка "Оформить заказ" недоступна для пустой корзины', async ({
        authenticatedPage2: _authenticatedPage2,
        cartPage,
    }) => {
        await cartPage.navigate()
        await cartPage.clearAll()
        await expect(cartPage.getStateOrderButton()).toBeDisabled()
    })

    test('TC-16. Оформление заказа', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
        cartPage,
        page,
    }) => {
        await inventoryPage.addToCartByName('iPhone 15 Pro')
        await inventoryPage.header.openCart()
        await cartPage.ordering()
        await expect(cartPage.toast(/заказ успешно создан!/i)).toBeVisible()
        await expect(page).toHaveURL('.')
    })
})
