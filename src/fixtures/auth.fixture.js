// src/fixtures/auth.fixture.js
// Даёт тестам "уже залогиненную" страницу

import { test as pagesTest } from './fixtures.js'
import { UserFactory } from '../factories/userFactory.js'
import { USER_TYPES } from '../data/userData.js'

export const test = pagesTest.extend({
    authUser: [
        async ({}, use) => use(UserFactory.standard()),
        { option: true },
    ],
    authUser2: [
        async ({}, use) => use(UserFactory.build(USER_TYPES.STANDARD2)),
        { option: true },
    ],
    adminUser: [
        async ({}, use) => use(UserFactory.build(USER_TYPES.ADMIN)),
        { option: true },
    ],

    authenticatedPage: async ({ page, loginPage, authUser }, use) => {
        await loginPage.navigate()
        await loginPage.login(authUser.username, authUser.password)
        await page.waitForURL('/')
        await use(page)
    },
    authenticatedPage2: async ({ page, loginPage, authUser2 }, use) => {
        await loginPage.navigate()
        await loginPage.login(authUser2.username, authUser2.password)
        await page.waitForURL('/')
        await use(page)
    },
    adminAuthenticatedPage: async ({ page, loginPage, adminUser }, use) => {
        await loginPage.navigate()
        await loginPage.login(adminUser.username, adminUser.password)
        await page.waitForURL('/')
        await use(page)
    },
})

export { expect } from './fixtures.js'
