import { BasePage } from './BasePage'

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page)

        this.firstName = page.getByTestId('firstName')
        this.lastName = page.getByTestId('lastName')
        this.email = page.getByTestId('email')
        this.username = page.getByTestId('username')
        this.phone = page.getByTestId('phone')
        this.password = page.getByTestId('password')

        this.registerButton = page.getByTestId('register')
        this.loginButton = page.getByTestId('login')

        this.errorMessage = page.getByTestId('register-error-message')
        this.successMessage = page.getByTestId('register-success-message')

        this.firstNameError = page.getByTestId('firstName-error')
        this.lastNameError = page.getByTestId('lastName-error')
        this.emailError = page.getByTestId('email-error')
        this.usernameError = page.getByTestId('username-error')
        this.phoneError = page.getByTestId('phone-error')
        this.passwordError = page.getByTestId('password-error')
    }

    async navigate() {
        await this.goto('/register')
    }

    async registration() {
        await this.registerButton.click()
    }

    async fillForm({ firstName, lastName, email, username, phone, password }) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.username.fill(username)
        await this.phone.fill(phone)
        await this.password.fill(password)
    }

    async registerUser(data) {
        await this.fillForm(data)
        await this.registration()
    }

    async getFieldError(field) {
        switch (field) {
            case 'firstName':
                return this.firstNameError.textContent()
            case 'lastName':
                return this.lastNameError.textContent()
            case 'email':
                return this.emailError.textContent()
            case 'username':
                return this.usernameError.textContent()
            case 'phone':
                return this.phoneError.textContent()
            case 'password':
                return this.passwordError.textContent()
            default:
                throw new Error(`Неизвестное поле: ${field}`)
        }
    }

    async getErrorMessage() {
        await super.isReady(this.errorMessage)
        return await this.errorMessage.textContent()
    }

    async getSuccessMessage() {
        await super.isReady(this.successMessage)
        return await this.successMessage.textContent()
    }
}
