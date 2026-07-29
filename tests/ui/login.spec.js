import { UserFactory } from '../../src/factories/userFactory'
import { test, expect } from '../../src/fixtures/fixtures'
import { faker } from '@faker-js/faker'

faker.seed(123)
const userList = UserFactory.createMany(3)

test.describe('login', () => {
    test('TC-01. Успешный вход с валидными данными', async ({ loginPage }) => {
        await loginPage.login('user1@test.com', 'user123')

        const successMessage = await loginPage.getSuccessMessage()
        expect(successMessage).toBe('Вход выполнен успешно!')
    })

    test('TC-02. Вход с несуществующим логином', async ({ loginPage }) => {
        await loginPage.login('1@test.com', 'user123')

        const errorMessage = await loginPage.getErrorMessage()
        expect(errorMessage).toBe('Неверный email или пароль')
    })

    test('TC-03. Вход с пустым полем password (username заполнен)', async ({
        loginPage,
    }) => {
        await loginPage.login('user1@test.com', '')

        await expect(loginPage.getPasswordWarning()).toBeVisible()

        const warningMessage = await loginPage.getPasswordWarningText()
        expect(warningMessage).toBe('Пароль обязателен')
    })

    for (const user of userList) {
        test(`DDT: Тест логина для пользователя: ${user.email}`, async ({
            loginPage,
        }) => {
            await loginPage.login(user.username, user.password)

            const errorMessage = await loginPage.getErrorMessage()
            expect(errorMessage).toBe('Неверный email или пароль')
        })
    }
})
