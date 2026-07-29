import { test, expect } from '../../src/fixtures/fixtures'
import { UserFactory } from '../../src/factories/userFactory'

test.describe('register', () => {
    test('TC-05: Регистрация с пустыми полями – показываются ошибки под каждым полем', async ({
        registerPage,
    }) => {
        await registerPage.registration()

        await expect(registerPage.firstNameError).toBeVisible()
        await expect(registerPage.lastNameError).toBeVisible()
        await expect(registerPage.emailError).toBeVisible()
        await expect(registerPage.usernameError).toBeVisible()
        await expect(registerPage.phoneError).toBeVisible()
        await expect(registerPage.passwordError).toBeVisible()

        await expect(registerPage.passwordError).toHaveText('Пароль обязателен')
    })

    test('TC-06: Некорректный phone – показывается ошибка', async ({
        registerPage,
    }) => {
        await registerPage.fillForm({
            firstName: 'Иван',
            lastName: 'Иванов',
            email: 'invalid-email@mail.ru',
            username: 'ivanov',
            phone: '1234567890',
            password: 'Qwerty123',
        })
        await registerPage.registration()

        const errorMessage = await registerPage.getErrorMessage()
        expect(errorMessage).toBe(
            'phoneNumber must be in international format (starting with +)'
        )
    })

    test('TC-07: Успешная регистрация с валидными данными', async ({
        registerPage,
    }) => {
        const user = UserFactory.create()
        delete user.toJSON

        await registerPage.registerUser(user)

        const successMessage = await registerPage.getSuccessMessage()
        expect(successMessage).toBe(
            'Регистрация прошла успешно! Теперь вы можете войти.'
        )

        await expect(registerPage.page).toHaveURL('/login')
    })

    test('TC-08: Попытка зарегистрироваться с уже существующим username', async ({
        registerPage,
    }) => {
        const existingUser = {
            firstName: 'Дмитрий',
            lastName: 'Дмитриев',
            email: 'user1@test.com',
            username: 'user1',
            phone: '+375293333333',
            password: 'Password123',
        }

        await registerPage.registerUser(existingUser)

        const errorMessage = await registerPage.getErrorMessage()
        expect(errorMessage).toBe(
            `Email "${existingUser.email}" already exists.`
        )
    })
})
