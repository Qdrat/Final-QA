import { Header } from '../components/Header'
import { BasePage } from './BasePage'

export class CartPage extends BasePage {
    constructor(page) {
        super(page)

        this.header = new Header(page)
        this.cartList = page.getByTestId('cart-list')
        this.emptyCartMessage = page.getByTestId('your-cart-empty')
        this.orderButton = page.getByTestId('place-your-order')
        this.totalPrice = page.getByTestId('total-price')
        this.productItems = page.getByTestId('product')
        this.itemProductName = page.getByTestId('item-product-name')
        this.itemProductPrice = page.getByTestId('item-product-price')
        this.delete = page.getByTestId('delete')
    }

    async navigate() {
        await this.goto('/cart')
        return this
    }

    async ordering() {
        await this.orderButton.click()
    }

    getStateOrderButton() {
        return this.orderButton
    }

    async getItemNamesInCartList() {
        await super.isReady(this.productItems.first().or(this.emptyCartMessage))
        return this.itemProductName.allTextContents()
    }

    async removeItemFromCart(itemName) {
        const item = this.productItems.filter({ hasText: itemName })
        await item.getByTestId('delete').click()
        await item.waitFor({ state: 'detached', timeout: 5000 })
    }

    async clearAll() {
        while (
            await this.productItems
                .first()
                .isVisible()
                .catch(() => false)
        ) {
            await this.delete.first().click()
        }
        await this.emptyCartMessage
            .waitFor({ state: 'visible' })
            .catch(() => {})
    }

    async getCartItemCount() {
        await super
            .isReady(this.productItems.first().or(this.emptyCartMessage))
            .catch(() => {})

        const hasItems = await this.productItems
            .first()
            .isVisible()
            .catch(() => false)
        if (!hasItems) return 0

        return await this.productItems.count()
    }
}
