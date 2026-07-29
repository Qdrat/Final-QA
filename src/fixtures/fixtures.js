import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { ProfilePage } from '../pages/ProfilePage'

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigate()
        await use(loginPage)
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page)
        await registerPage.navigate()
        await use(registerPage)
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },
    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page)
        await use(productDetailPage)
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page)
        await use(cartPage)
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page)
        await use(profilePage)
    },
})
export { expect } from '@playwright/test'
