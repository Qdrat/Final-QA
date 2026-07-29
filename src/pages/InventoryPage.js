import { Header } from '../components/Header'
import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page)

        this.header = new Header(page)

        this.productList = page.getByTestId('product-list')
        this.productContainer = page.getByTestId('product')
        this.productDescription = page.getByTestId('product-description')
        this.productName = page.getByTestId('product-name')
        this.productPrice = page.getByTestId('product-price')
    }

    async addToCartByName(productName) {
        const item = this.productContainer.filter({ hasText: productName })
        await item.getByTestId('add-to-cart').click()
    }

    async getAllProductNames() {
        await super.isReady(this.productContainer.last())
        return this.productName.allTextContents()
    }

    async getAllPrices() {
        await super.isReady(this.productContainer.last())
        const texts = await this.productPrice.allTextContents()
        return texts.map((t) => parseFloat(t.replace('₽', '')))
    }

    async openFirstProduct() {
        await this.getFirstProduct().click()
    }

    getFirstProduct() {
        return this.productContainer.first()
    }

    getProductList() {
        return this.productList
    }
}
