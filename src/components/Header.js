export class Header {
    constructor(page) {
        this.page = page

        this.linkHome = page.getByTestId('home')
        this.linkOrders = page.getByTestId('orders')
        this.linkCart = page.getByTestId('cart')
        this.dropDownMenu = page.getByTestId('drop-down-menu')
        this.userUsername = this.dropDownMenu.getByTestId('user-username')

        this.userFullName = page.getByTestId('userFullName')
        this.userEmail = page.getByTestId('userEmail')
        this.profile = page.getByTestId('profile')
        this.orderHistory = page.getByTestId('order-history')
        this.logout = page.getByTestId('logout')
    }

    async gotoHome() {
        await this.linkHome.click()
    }

    async openOrders() {
        await this.linkOrders.click()
    }

    async openCart() {
        await this.linkCart.click()
    }

    async openDropDownMenu() {
        await this.dropDownMenu.click()
    }

    getDropDownMenu() {
        return this.dropDownMenu
    }

    async logoutUser() {
        await this.openDropDownMenu()
        await this.logout.click()
    }

    async openProfile() {
        await this.openDropDownMenu()
        await this.profile.click()
    }
}
