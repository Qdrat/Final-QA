import { faker } from '@faker-js/faker'
import { usersData, USER_TYPES } from '../data/userData'

export class UserFactory {
    static create() {
        return {
            email: faker.internet.email().toLowerCase(),

            password: faker.internet.password({
                length: 12,
                memorable: false,
            }),

            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),

            username: faker.internet.username(),

            phone: faker.phone.number({ style: 'international' }),

            // Для API тестов
            toJSON() {
                return {
                    email: this.email,
                    password: this.password,
                    name: `${this.firstName} ${this.lastName}`,
                }
            },
        }
    }

    static createMany(count = 5) {
        return Array.from({ length: count }, () => this.create())
    }

    static build(userType = USER_TYPES.STANDARD, overrides = {}) {
        const base = usersData[userType]
        if (!base) {
            throw new Error(`Unknown user type: "${userType}"`)
        }
        return { ...base, ...overrides }
    }

    static standard(overrides = {}) {
        return this.build(USER_TYPES.STANDARD, overrides)
    }
}
