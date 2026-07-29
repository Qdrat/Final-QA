import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
    constructor(page) {
        super(page)

        this.username = page.getByTestId('email')
        this.password = page.getByTestId('password')
        this.loginButton = page.getByTestId('submit')

        this.errorMessage = page.getByTestId('login-error-message')
        this.successMessage = page.getByTestId('login-success-message')

        this.emailError = page.getByTestId('email-error')
        this.passwordError = page.getByTestId('password-error')
    }

    async navigate() {
        await this.goto('/login')
        return this
    }

    async fillUsername(name) {
        await this.username.fill(name)
    }

    async fillPassword(pass) {
        await this.password.fill(pass)
    }

    async submit() {
        await this.loginButton.click()
    }

    async login(username, password) {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.submit()
    }

    async getErrorMessage() {
        await super.isReady(this.errorMessage)
        return await this.errorMessage.textContent()
    }

    async getSuccessMessage() {
        await super.isReady(this.successMessage)
        return await this.successMessage.textContent()
    }

    async getPasswordWarningText() {
        return await this.passwordError.textContent()
    }

    getPasswordWarning() {
        return this.passwordError
    }

    getEmailWarning() {
        return this.emailError
    }
}
