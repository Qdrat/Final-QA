import { BasePage } from './BasePage'

export class ProductDetailPage extends BasePage {
    constructor(page) {
        super(page)

        this.name = page.getByTestId('product-name')
        this.category = page.getByTestId('product-category')
        this.price = page.getByTestId('product-price')
        this.description = page.getByTestId('product-description')
        this.addToCartButton = page.getByTestId('add-to-cart')

        this.notFoundMessage = page.getByText('Продукт не найден.')
        this.errorMessage = page.getByText(/Ошибка:/)
    }

    async navigate(productId) {
        await this.goto(`/product/${productId}`)
        return this
    }

    async addToCart() {
        await this.addToCartButton.click()
    }

    getProductName() {
        return this.name
    }
}
