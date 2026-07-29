import { test, expect } from '../../src/fixtures/auth.fixture'
import { UserFactory } from '../../src/factories/userFactory'

test.describe('menu_logout', () => {
    test('TC-17. Открытие бокового меню', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
    }) => {
        await inventoryPage.header.openDropDownMenu()
        await expect(inventoryPage.header.getDropDownMenu()).toHaveAttribute(
            'data-state',
            'open'
        )
    })

    test('TC-18. Успешный логаут', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
        page,
    }) => {
        await inventoryPage.header.logoutUser()
        await expect(page).toHaveURL('./login')
    })

    test('TC-19. Изменение данных для залогиневшегося пользователя', async ({
        authenticatedPage: _authenticatedPage,
        inventoryPage,
        profilePage,
    }) => {
        const user = UserFactory.create()
        const { email: _email, ...newUser } = user
        await inventoryPage.header.openProfile()
        await profilePage.saveChanges(newUser)

        await expect(
            profilePage.toast(/профиль успешно обновлен!/i)
        ).toBeVisible()
    })
})
