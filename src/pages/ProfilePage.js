import { BasePage } from './BasePage'

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page)

        this.firstName = page.getByTestId('firstname')
        this.lastName = page.getByTestId('lastname')
        this.email = page.getByTestId('email')
        this.username = page.getByTestId('username')
        this.phone = page.getByTestId('phone')

        this.submitButton = page.getByTestId('submit')
    }

    async navigate() {
        await this.goto('/profile')
    }

    async submitChanges() {
        await this.submitButton.click()
    }

    async fillForm({ firstName, lastName, email, username, phone }) {
        if (firstName) await this.firstName.fill(firstName)
        if (lastName) await this.lastName.fill(lastName)
        if (email) await this.email.fill(email)
        if (username) await this.username.fill(username)
        if (phone) await this.phone.fill(phone)
    }

    async saveChanges(data) {
        await this.fillForm(data)
        await this.submitChanges()
    }
}
