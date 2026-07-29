// src/pages/base.page.js
// Родитель для всех Page Object'ов.

export class BasePage {
    constructor(page) {
        this.page = page
    }

    async goto(path = '/') {
        await this.page.goto(path)
    }

    async getTitle() {
        return this.page.title()
    }

    async isReady(locator) {
        await locator.waitFor({ state: 'visible' })
        return locator
    }

    toast(textOrPattern) {
        return this.page.getByText(textOrPattern)
    }
}
